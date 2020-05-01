import { HttpClient } from '@angular/common/http';
import { BaseEntity } from './baseEntity';

export abstract class BaseService<T extends BaseEntity> {

  constructor(private httpClient: HttpClient) { }

  protected serverUrl: string;

  entities: T[];
  observers: ((observable: T[]) => void)[] = [];

  add(entity: T) {
    this.httpClient.post<T>(this.serverUrl, entity)
      .subscribe((entity) => {
        if (entity.id) {
          let index = this.entities.findIndex(i => i.id == entity.id);
          if(index >= 0) {
            this.entities[index] = entity;
          } else {
            this.insertNew(this.entities, entity);
          }
        } else {
          this.insertNew(this.entities, entity);
        }
        this.notifyAll();
      });
  }

  delete(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id)
      .subscribe(() => {
        let index = this.entities.findIndex(i => i.id == id);
        this.entities.splice(index, 1);
        this.notifyAll();
      });
  }

  register(observer: (observable: T[]) => void) {
    this.observers.push(observer);
    console.log(this.observers.length + ' Observers conected to ')
  }

  protected loadAll() {
    this.getAll().then((entities) => {
      this.entities = entities;
      this.notifyAll();
    });
  }

  async getAll(): Promise<T[]> {
    if(!this.entities) {
      this.entities = await this.httpClient.get<T[]>(this.serverUrl).toPromise();
    }
    return this.sort(this.entities);
  }

  protected insertNew(entities: T[], entity: T) {
    for (let i = 0; i < entities.length; i++) {
      if (this.compare(entities[i], entity) >= 0) {
        entities.splice(i, 0, entity);
        return;
      }
    }
    entities.push(entity);
  }

  protected notifyAll() {
    this.observers.forEach(item => item(this.entities));
  }

  protected getHttpClient() {
    return this.httpClient;
  }

  sort(entities: T[]): T[] {
    return entities.sort(this.compare);
  };

  abstract compare(entity1: T, entity2: T): number
}

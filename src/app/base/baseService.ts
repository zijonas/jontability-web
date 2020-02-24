import { HttpClient } from '@angular/common/http';
import { BaseEntity } from './baseEntity';

export abstract class BaseService<T extends BaseEntity> {

  constructor(private httpClient: HttpClient) {}

  protected serverUrl = ''
  
  entities: T[];
  observers: ((observable: T[]) => void)[] = [];
  
  add(entities: T) {
    this.httpClient.post<T>(this.serverUrl, entities)
    .subscribe((acc) => {
      if(entities.id) {
        let index = this.entities.findIndex(i => i.id == entities.id);
        this.entities[index] = acc;
      } else {
        this.entities.push(acc);
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
    if(this.entities) {
      observer(this.entities);
    } else {
      this.loadAll();
    }
    console.log(this.observers.length + ' Observers conected to ')
  }
  
  protected loadAll() {
    this.httpClient.get<T[]>(this.serverUrl)
      .subscribe((acc) => {
        this.entities = acc;
        this.notifyAll();
      });
  }
  
  protected notifyAll() {
    this.observers.forEach(item => item(this.entities));
  }

  protected getHttpClient() {
    return this.httpClient;
  }
}

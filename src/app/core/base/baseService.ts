import { HttpClient } from '@angular/common/http';
import { BaseEntity, BaseContainer } from './baseEntity';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';

export abstract class BaseService<T extends BaseEntity> {

  constructor(private httpClient: HttpClient) { }

  protected entities: BehaviorSubject<T[]> = new BehaviorSubject(null);
  private theEntities: T[];
  protected serverUrl: string;
  entities$: Observable<T[]> = this.entities.asObservable();
  amount: number;

  register(callback: (entities: T[]) => any): Subscription  {
    this.loadAll();
    return this.entities$.subscribe(callback);
  }

  add(entity: T) {
    this.httpClient.post<T>(this.serverUrl, entity)
      .subscribe((responseEntity) => {
        if (entity.id) {
          this.updateExisting(responseEntity);
        } else {
          this.insertNew(this.theEntities, responseEntity);
        }
        this.updateData(this.theEntities);
      });
  }

  private updateExisting(responseEntity: T) {
    let index = this.theEntities.findIndex(i => i.id == responseEntity.id);
    if (index >= 0) {
      this.theEntities[index] = responseEntity;
    } else {
      this.insertNew(this.theEntities, responseEntity);
    }
  }

  delete(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id)
      .subscribe(() => {
        let index = this.theEntities.findIndex(i => i.id == id);
        this.theEntities.splice(index, 1);
        this.updateData(this.theEntities);
      });
  }

  loadAll(): void {
    if (this.entities.value == null) {
      this.reload();
    }
  }

  reload(): void {
    console.log("reloaded");
    this.httpClient.get<T[]>(this.serverUrl)
      .subscribe(response => {
        this.updateData(this.sort(response));
      });
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

  protected updateData(entities: T[]) {
    this.theEntities = entities;
    this.entities.next(this.theEntities);
    this.amount = this.theEntities.length;
  }

  protected getHttpClient() {
    return this.httpClient;
  }

  sort(entities: T[]): T[] {
    return entities.sort(this.compare);
  };

  abstract compare(entity1: T, entity2: T): number
}

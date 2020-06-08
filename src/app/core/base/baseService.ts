import { HttpClient } from '@angular/common/http';
import { BaseEntity } from './baseEntity';
import { BehaviorSubject, Observable } from 'rxjs';
import { OnInit } from '@angular/core';

export abstract class BaseService<T extends BaseEntity> implements OnInit {

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit(): void {
    this.entities$ = this.entities.asObservable();
  }

  private entities: BehaviorSubject<T[]> = new BehaviorSubject(null);
  private theEntities: T[];
  protected serverUrl: string;
  entities$: Observable<T[]>;

  register(callback: (entities: T[]) => any) {
    this.entities.subscribe(callback);
  }

  add(entity: T) {
    this.httpClient.post<T>(this.serverUrl, entity)
      .subscribe((entity) => {
        if (entity.id) {
          let index = this.theEntities.findIndex(i => i.id == entity.id);
          if (index >= 0) {
            this.theEntities[index] = entity;
          } else {
            this.insertNew(this.theEntities, entity);
          }
        } else {
          this.insertNew(this.theEntities, entity);
        }
        this.entities.next(this.theEntities);
      });
  }

  delete(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id)
      .subscribe(() => {
        let index = this.theEntities.findIndex(i => i.id == id);
        this.theEntities.splice(index, 1);
        this.entities.next(this.theEntities);
      });
  }

  loadAll(): void {
    if(this.entities.value == null) {
      console.log("reloaded");
      
      this.httpClient.get<T[]>(this.serverUrl)
        .subscribe(response => {
          this.theEntities = response;
          this.entities.next(this.sort(this.theEntities))
        });
    } 
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

  protected getHttpClient() {
    return this.httpClient;
  }

  sort(entities: T[]): T[] {
    return entities.sort(this.compare);
  };

  abstract compare(entity1: T, entity2: T): number
}

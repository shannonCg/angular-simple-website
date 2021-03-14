import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:8080/api/heroes'

  constructor(
    private http: HttpClient,
    private messageService:MessageService) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
                    .pipe(
                      tap(_ => this.log('fetch heroes')),
                      catchError(this.handleError<Hero[]>('getHeros', []))
                    );
  }

  getHero(id:number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
                    .pipe(
                      tap(_ => this.log(`fetch hero id=${id}`)),
                      catchError(this.handleError<Hero>(`getHero id=${id}`))
                    );
  }

  updateHero(hero: Hero): Observable<any>{
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, hero)
                    .pipe(
                      tap(_ => this.log(`update hero id=${hero.id}`)),
                      catchError(this.handleError<any>("updateHero"))
                    );
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero)
                    .pipe(
                      tap((newHero: Hero) => this.log(`added hero id=${newHero.id}`)),
                      catchError(this.handleError<Hero>("addHero"))
                    );
  }

  deleteHero(hero: Hero|number): Observable<Hero>{
    const id = typeof hero === 'number'? hero:hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url)
                    .pipe(
                      tap(_ => this.log(`deleted hero id=${id}`)),
                      catchError(this.handleError<any>("deleteHero"))
                    );                    
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if(! term.trim()){
      return of([]);
    }

    const url = `${this.heroesUrl}/search?name=${term}`
    return this.http.get<Hero[]>(url)
                    .pipe(
                      tap(x => x.length? 
                        this.log(`found heroes matching "${term}"`): 
                        this.log(`no heroes matching "${term}"`)),
                      catchError(this.handleError<Hero[]>("searchHeroes", []))
                    );
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}

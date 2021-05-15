import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {Iprobleme} from './probleme';
 
@Injectable()
export class ProblemeService {

//private baseUrl = 'https://localhost:5001/Intervention';
private baseUrl = 'https://interventionsjcc2021.azurewebsites.net/Intervention';

constructor(private _http: HttpClient) { }

saveProbleme(probleme: Iprobleme): Observable<Iprobleme> {
    return this.createProbleme(probleme);
  }
  
 /** POST: add a new problem to the server */
private createProbleme(probleme: Iprobleme): Observable<Iprobleme> {
  return this._http.post<Iprobleme>(this.baseUrl, probleme, this.httpOptions).pipe(
    tap((probleme: Iprobleme) => console.log('added problem w/ id=${probleme.id}')),
    catchError(this.handleError)
  );
}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(err.error);
    //return Observable.throw(err.message);
    return throwError(err.message);
  }
}
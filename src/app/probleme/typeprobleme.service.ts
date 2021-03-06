import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ITypeProbleme } from './typeprobleme';
import {catchError, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TypeproblemeService {

  //private URLDonnes = 'https://localhost:5001/Intervention';
  private URLDonnes = 'https://interventionsjcc2021.azurewebsites.net/Intervention';


  constructor(private http: HttpClient) { }

  obtenirTypeProbleme(): Observable<ITypeProbleme[]>{
    return this.http.get<ITypeProbleme[]>(this.URLDonnes).pipe(
      tap(data => console.log('obtenirTypeProbleme: ' + JSON.stringify(data))),
      catchError(this.handleError)
      );
  }
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

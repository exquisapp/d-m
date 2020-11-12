import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private httpClient: HttpClient) { }

  // get valid emails
  getValidEmails(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  // get posts
  getPosts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  // get comments for posts
  getPostsComments(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/comments`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  // Error handling
  errorHandler(error) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}

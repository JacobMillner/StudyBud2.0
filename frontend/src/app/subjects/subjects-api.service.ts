import * as Auth0 from 'auth0-web';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {API_URL} from '../env';
import {Subject} from './subject.model';

@Injectable()
export class SubjectsApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future subjects
  getSubjects(): Observable<Subject[]> {
    return this.http
      .get<Subject[]>(`${API_URL}/subjects`).pipe(
      catchError(SubjectsApiService._handleError));
  }

  saveSubject(subject: Subject): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http
      .post(`${API_URL}/subjects`, subject, httpOptions);
  }

  deleteSubject(subjectId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http
      .delete(`${API_URL}/subjects/${subjectId}`, httpOptions);
  }
}
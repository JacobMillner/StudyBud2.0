import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
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
}
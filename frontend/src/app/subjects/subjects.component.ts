import * as Auth0 from 'auth0-web';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Subject} from './subject.model';
import {SubjectsApiService} from './subjects-api.service';

@Component({
  selector: 'subjects',
  template: `
    <h2>Study Subjects</h2>
    <p>Choose a Subject to track study time.</p>
    <div class="subjects">
      <mat-card class="subjectple-card" *ngFor="let subject of subjectsList" class="mat-elevation-z5">
        <mat-card-content>
          <mat-card-title>{{subject.title}}</mat-card-title>
          <mat-card-subtitle>{{subject.description}}</mat-card-subtitle>
          <p>
            {{exam.long_description}}
          </p>
          <button mat-raised-button color="accent">Start</button>
          <button mat-button color="warn" *ngIf="isAdmin()"
                  (click)="delete(subject.id)">
            Delete
          </button>
        </mat-card-content>
      </mat-card>
    </div>
    <button mat-fab color="primary" *ngIf="authenticated"
            class="new-subject" routerLink="/new-subject">
      <i class="material-icons">note_add</i>
    </button>
  `,
  styleUrls: ['subjects.component.css'],
})
export class SubjectsComponent implements OnInit, OnDestroy {
  subjectsListSubs: Subscription;
  subjectsList: Subject[];
  authenticated = false;

  constructor(private subjectsApi: SubjectsApiService) {
  }

  ngOnInit() {
    this.subjectsListSubs = this.subjectsApi
      .getSubjects()
      .subscribe(res => {
          this.subjectsList = res;
        },
        console.error
      );

    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }

  ngOnDestroy() {
    this.subjectsListSubs.unsubscribe();
  }

  delete(subjectId: number) {
    this.subjectsApi
      .deleteSubject(subjectId)
      .subscribe(() => {
        this.subjectsListSubs = this.subjectsApi
          .getSubjects()
          .subscribe(res => {
              this.subjectsList = res;
            },
            console.error
          )
      }, console.error);
  }

  isAdmin() {
    if (!Auth0.isAuthenticated()) return false;

    const roles = Auth0.getProfile()['https://study-bud.com/roles'];
    return roles.includes('admin');
  }
}
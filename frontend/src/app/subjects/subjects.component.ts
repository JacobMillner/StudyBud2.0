import * as Auth0 from 'auth0-web';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Subject} from './subject.model';
import {SubjectsApiService} from './subjects-api.service';

@Component({
  selector: 'subjects',
  template: `
    <div>
      <button routerLink="/new-subject">New Subject</button>
      <button (click)="signIn()" *ngIf="!authenticated">Sign In</button>
      <button (click)="signOut()" *ngIf="authenticated">Sign Out</button>
      <p *ngIf="authenticated">Hello, {{getProfile().name}}</p>
      <ul>
        <li *ngFor="let subject of subjectsList">
          {{subject.title}}
        </li>
      </ul>
    </div>
  `
})
export class SubjectsComponent implements OnInit, OnDestroy {
  subjectsListSubs: Subscription;
  subjectsList: Subject[];
  authenticated = false;

  constructor(private subjectsApi: SubjectsApiService) {
  }

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  getProfile = Auth0.getProfile;

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
}
import * as Auth0 from 'auth0-web';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {SubjectsApiService} from './subjects/subjects-api.service';
import {SubjectFormComponent} from './subjects/subject-form.component';
import {SubjectsComponent} from './subjects/subjects.component';
import {CallbackComponent} from './callback.component';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';

const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'new-subject', component: SubjectFormComponent },
  { path: '', component: SubjectsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SubjectFormComponent,
    SubjectsComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [SubjectsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
      Auth0.configure({
        domain: 'studybud.auth0.com',
        audience: 'https://study-bud.com/',
        clientID: 'n8X9LuACQRanrZ9Jo1Gh57zU2FnhBA0m',
        redirectUri: 'http://localhost:4200/callback',
        scope: 'openid profile manage:subjects'
      });
  }
}
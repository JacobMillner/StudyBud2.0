import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubjectsApiService} from "./subjects-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'subject-form',
  template: `
    <div>
      <h2>New Subject</h2>
      <label for="subject-title">Title</label>
      <input id="subject-title" (keyup)="updateTitle($event)">
      <label for="subject-description">Description</label>
      <input id="subject-description" (keyup)="updateDescription($event)">
      <button (click)="saveSubject()">Save Subject</button>
    </div>
  `
})
export class SubjectFormComponent {
  subject = {
    title: '',
    description: '',
  };

  constructor(private subjectsApi: SubjectsApiService, private router: Router) { }

  updateTitle(event: any) {
    this.subject.title = event.target.value;
  }

  updateDescription(event: any) {
    this.subject.description = event.target.value;
  }

  saveSubject() {
    this.subjectsApi
      .saveSubject(this.subject)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }
}
import {Component} from '@angular/core';
import {SubjectsApiService} from "./subjects-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'subject-form',
  template: `
    <mat-card>
      <h2>New Subject</h2>
        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Title"
                 (keyup)="updateTitle($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <input matInput
                 placeholder="Description"
                 (keyup)="updateDescription($event)">
        </mat-form-field>

        <mat-form-field class="full-width">
          <textarea rows="5"
                    matInput
                    placeholder="Long Description"
                    (keyup)="updateLongDescription($event)"></textarea>
        </mat-form-field>

        <button mat-raised-button
                color="primary"
                (click)="saveSubject()">
          Save Subject
        </button>
    </mat-card>
  `,
  styles: [`
    .subjects-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .full-width {
      width: 100%;
    }
  `]
})
export class SubjectFormComponent {
  subject = {
    title: '',
    description: '',
    long_description: '',
  };

  constructor(private subjectsApi: SubjectsApiService, private router: Router) { }

  updateTitle(event: any) {
    this.subject.title = event.target.value;
  }

  updateDescription(event: any) {
    this.subject.description = event.target.value;
  }

  updateLongDescription(event: any) {
    this.subject.long_description = event.target.value;
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
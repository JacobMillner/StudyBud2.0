import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {SubjectsApiService} from './subjects/subjects-api.service';
import {Subject} from './subjects/subject.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  subjectsListSubs : Subscription;
  subjectsList: Subject[]; 
  
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
  }

  ngOnDestroy() {
    this.subjectsListSubs.unsubscribe();
  }
  
}


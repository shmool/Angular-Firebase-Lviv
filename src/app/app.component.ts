import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { LvivRecommendationsService } from './lviv-recommendations.service';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  template: `
    <h1>https://angular-lviv-demo.firebaseapp.com
    </h1>
    <div *ngIf="(user$ | async) as user; else signInButton">
      <button (click)="signOut()">Sign Out</button>
      <h2>Hello {{ user.displayName }}</h2>
      <!--<img [src]="user.photoURL">-->

      <input (keyup.enter)="saveInput($event)">

    </div>

    <ul>
      <li *ngFor="let item of rec$ | async">
        <span *ngIf="!item.edit"
              (click)="item.edit = !item.edit">{{ item.title }}</span>
        <input *ngIf="item.edit"
               [value]="item.title"
               (keyup.enter)="updateItem($event, item)">
      </li>
    </ul>

    <ng-template #signInButton>
      <button (click)="signIn()">Sign In With Google</button>
    </ng-template>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rec$: AngularFireList<{}>;
  user$: any;

  constructor(
    private userService: UserService,
    private lrs: LvivRecommendationsService) {
  }

  ngOnInit() {
    this.user$ = this.userService.user$;
    this.rec$ = this.lrs.recommendations$;
  }

  updateItem(event, item) {
    this.lrs.update(item.key, event.target.value);
    item.edit = false;
  }

  saveInput(event) {
    this.lrs.save(event.target.value);
  }

  signIn() {
    this.userService.signInWithGoogle();
  }

  signOut() {
    this.userService.signOut();
  }
}

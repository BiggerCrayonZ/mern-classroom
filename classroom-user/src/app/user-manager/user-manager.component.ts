import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'manager0-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.sass']
})
export class UserManagerComponent implements OnInit {

  loading = false;
  users$: Observable<User[]>;

  @Input() token: string;
  @Input() filter: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers(this.token, this.filter)
      .pipe(
        tap(_ => this.loading = true),
        debounceTime(3000),
        distinctUntilChanged(),
        tap(_ => this.loading = false)
      );
  }

}

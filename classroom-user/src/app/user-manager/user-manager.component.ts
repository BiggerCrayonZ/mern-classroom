import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../shared/model/user';
import { Header } from '../shared/model/header';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ModalService } from '../service/modal.service';
import { Role } from '../shared/model/role';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'manager0-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.sass']
})
export class UserManagerComponent implements OnInit {

  loading = false;
  headers;
  users$: Observable<User[]>;
  roles$: Observable<Role[]>;

  @Input() token: string;
  @Input() filter: string;

  constructor(
    private userService: UserService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.headers = this.userService.getTableHeader();
    this.roles$ = this.userService.getUserRoles(this.token)
      .pipe(
        tap(_ => this.loading = true),
        debounceTime(3000),
        distinctUntilChanged(),
        tap(_ => this.loading = false)
      );
    this.users$ = this.userService.getUsers(this.token, this.filter)
      .pipe(
        tap(_ => this.loading = true),
        debounceTime(3000),
        distinctUntilChanged(),
        tap(_ => this.loading = false)
      );
  }

  refresh(): void {
    this.users$ = this.userService.getUsers(this.token, this.filter)
      .pipe(
        tap(_ => this.loading = true),
        debounceTime(3000),
        distinctUntilChanged(),
        tap(_ => this.loading = false)
      );
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  submit(data: NgForm) {
    console.log({ data });
  }

}

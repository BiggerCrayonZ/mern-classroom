import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core'
import { UserService } from '../user.service'
import { Observable, fromEvent, Subscription } from 'rxjs'
import { User } from '../shared/model/user'
import { Header } from '../shared/model/header'
import {
  tap,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith
} from 'rxjs/operators'
import { ModalService } from '../service/modal.service'
import { Role } from '../shared/model/role'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'manager0-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.sass']
})
export class UserManagerComponent implements OnInit {
  loading = false
  userIdExist = false
  headers
  users$: Observable<User[]>
  roles$: Observable<Role[]>

  private usernameSubscription: Subscription

  @Input() token: string
  @Input() filter: string

  @ViewChild('username') searchUsername: any

  constructor (
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit (): void {
    this.headers = this.userService.getTableHeader()
    this.roles$ = this.userService.getUserRoles(this.token).pipe(
      tap(_ => (this.loading = true)),
      debounceTime(3000),
      distinctUntilChanged(),
      tap(_ => (this.loading = false))
    )
    this.users$ = this.userService.getUsers(this.token, this.filter).pipe(
      tap(_ => (this.loading = true)),
      debounceTime(3000),
      distinctUntilChanged(),
      tap(_ => (this.loading = false))
    )
  }

  ngAfterViewInit () {
    this.subscribeInputUsername()
  }

  subscribeInputUsername () {
    const terms$ = fromEvent<any>(
      this.searchUsername.nativeElement,
      'blur'
    ).pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged()
    )
    this.usernameSubscription = terms$.subscribe(toSearch => {
      this.users$.subscribe(data => {
        const criteria: String = toSearch
        const users: any = data.map(x => x.username.toLowerCase());
        const exist: Boolean = users.includes(criteria.trim().toLowerCase());
        console.log({ exist });
        if (exist) {
          this.userIdExist = true
        } else this.userIdExist = false
      })
    })
  }

  refresh (): void {
    this.users$ = this.userService.getUsers(this.token, this.filter).pipe(
      tap(_ => (this.loading = true)),
      debounceTime(3000),
      distinctUntilChanged(),
      tap(_ => (this.loading = false))
    )
  }

  openModal (id: string): void {
    this.modalService.open(id)
  }

  closeModal (id: string): void {
    this.modalService.close(id)
  }

  submit (data: NgForm) {
    console.log({ data })
  }
}

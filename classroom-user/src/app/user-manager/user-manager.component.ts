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
  emailExist = false
  userIdExist = false
  headers
  users$: Observable<User[]>
  roles$: Observable<Role[]>

  private emailSubscription: Subscription
  private usernameSubscription: Subscription

  @Input() token: string
  @Input() filter: string

  @ViewChild('username') searchUsername: any
  @ViewChild('email') searchEmail: any

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
    this.subscribeUserIdExist()
    this.subscribeEmailExist()
  }

  evaluateIncludingParam (arr: Array<any>, criteria: string, mapParam: string) {
    const chain: any = arr.map(x => x[mapParam].toLowerCase())
    return Boolean(chain.includes(criteria.trim().toLowerCase()))
  }

  subscribeUserIdExist () {
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
        if (this.evaluateIncludingParam(data, toSearch, 'username'))
          this.userIdExist = true
        else this.userIdExist = false
      })
    })
  }

  subscribeEmailExist () {
    console.log('hola')
    const terms$ = fromEvent<any>(this.searchEmail.nativeElement, 'blur').pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged()
    )
    this.emailSubscription = terms$.subscribe(toSearch => {
      this.users$.subscribe(data => {
        const exist = this.evaluateIncludingParam(data, toSearch, 'email')
        console.log({
          exist,
          toSearch,
          data
        })
        if (exist) this.emailExist = true
        else this.emailExist = false
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

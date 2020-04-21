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
import swal from 'sweetalert2';

@Component({
  selector: 'manager0-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.sass']
})
export class UserManagerComponent implements OnInit, AfterViewInit {
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
  @ViewChild('password') searchPassword: any
  @ViewChild('rePassword') searchRepassword: any

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

  evaluateForm (value: object) {
    const someEmpty: boolean = Object.entries(value)
      .map(x => x[1])
      .every(x => x !== '')
    if (!someEmpty) {
      return false
    }
    console.log('object')
    return true
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
    const terms$ = fromEvent<any>(this.searchEmail.nativeElement, 'blur').pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged()
    )
    this.emailSubscription = terms$.subscribe(toSearch => {
      this.users$.subscribe(data => {
        const exist = this.evaluateIncludingParam(data, toSearch, 'email')
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

  delete (id: string): void {
    if (id.length > 0) {
      const remove$ = this.userService.delete(this.token, id).pipe(
        tap(_ => (this.loading = true)),
        distinctUntilChanged(),
        tap(_ => (this.loading = false))
      )
      remove$.subscribe((data) => {
        this.refresh();
        swal.fire({
          icon: 'success',
          title: 'User Removed',
          text: data.message,
        })
      });
    }
  }

  submit (data: NgForm) {
    const {
      form: { value }
    } = data
    if (this.evaluateForm(value)) {
      const creation$ = this.userService.create(this.token, value).pipe(
        tap(_ => (this.loading = true)),
        distinctUntilChanged(),
        tap(_ => (this.loading = false))
      )
      creation$.subscribe((data) => {
        this.refresh();
        this.closeModal('createUser');
        swal.fire({
          icon: 'success',
          title: 'User Created',
          text: `The user :${data.username} was created successfully`,
        })
        console.log({ data });
      })
    }
  }
}

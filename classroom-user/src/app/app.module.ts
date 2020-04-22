import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserService } from './user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from './shared/component/modal/modal.component';

@NgModule({
  declarations: [
    UserManagerComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatIconModule,
    FormsModule,
  ],
  exports: [
    MatIconModule,
  ],
  providers: [UserService],
  entryComponents: [UserManagerComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    const custom = createCustomElement(UserManagerComponent, {injector: injector});
    customElements.define('manager0-user-manager', custom);
  }
  ngDoBootstrap() {}
}

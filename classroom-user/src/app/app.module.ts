import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from './shared/component/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserManagerComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

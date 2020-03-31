import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';


@Component({
  selector: 'manager0-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'classroom-user';
  env: string;
  ngOnInit() {
    this.env = environment.environment;
  }
}

import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mes annonces', url: 'my-annonces', icon: 'albums' },
    { title: 'Mes amis', url: '/folder/outbox', icon: 'people-circle' },
  ];

  constructor() {}
}

import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Acceuil', url: 'home', icon: 'albums' },
    { title: 'Mes annonces', url: 'my-annonces', icon: 'albums' },
  ];

  constructor() {}
}

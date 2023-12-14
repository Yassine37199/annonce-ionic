import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-annonces',
  templateUrl: './my-annonces.page.html',
  styleUrls: ['./my-annonces.page.scss'],
})
export class MyAnnoncesPage implements OnInit {
  currentUser: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }
}

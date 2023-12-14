import { Component, OnInit } from '@angular/core';
import { annoncesList } from '../dummy.data';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  annoncesList = annoncesList;

  filteredAnnoncesList = this.annoncesList;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.login();
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredAnnoncesList = this.annoncesList.filter((annonce) => {
      return annonce.titre.toLowerCase().includes(searchTerm);
    });
  }

  async login() {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        'yassineouri@samrise.cloud',
        'Password_test002'
      );
      console.log('User signed in:', result.user);
    } catch (error) {
      console.error('Error signing in');
    }
  }
}

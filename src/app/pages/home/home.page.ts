import { Component, OnInit } from '@angular/core';
import { annoncesList } from '../dummy.data';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  annoncesList = annoncesList;

  filteredAnnoncesList = this.annoncesList;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.firestore
      .collection('/annonces')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((change) => {
            const data = change.payload.doc.data() as any;
            const id = change.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((annonces: any[]) => {
        console.log(annonces);
        this.annoncesList = annonces;
        this.filteredAnnoncesList = this.annoncesList;
      });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredAnnoncesList = this.annoncesList.filter((annonce) => {
      return annonce.titre.toLowerCase().includes(searchTerm);
    });
  }

  navigateToAnnonce(id: any) {
    console.log(id);
    this.router.navigate(['annonce', id]);
  }

  logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        console.log('User logged out successfully.');

        // Redirect to the login page
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }
}

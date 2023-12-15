import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { annoncesList } from '../dummy.data';

@Component({
  selector: 'app-my-annonces',
  templateUrl: './my-annonces.page.html',
  styleUrls: ['./my-annonces.page.scss'],
})
export class MyAnnoncesPage implements OnInit {
  currentUserEmail: any;
  annoncesList = annoncesList;
  filteredAnnoncesList = this.annoncesList;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.currentUserEmail = user.uid;
        console.log('Current User Email:', this.currentUserEmail);
      }
    });
  }

  navigateToAnnonce(id: any) {
    this.router.navigate(['annonce', id]);
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    // this.filteredAnnoncesList = this.annoncesList.filter((annonce) => {
    //   return annonce.titre.toLowerCase().includes(searchTerm);
    // });
  }

  toAddPage() {
    this.router.navigate(['add-annonce']);
  }
}

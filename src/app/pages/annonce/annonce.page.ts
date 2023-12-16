import { Component, OnInit } from '@angular/core';
import { annoncesList } from '../dummy.data';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.page.html',
  styleUrls: ['./annonce.page.scss'],
})
export class AnnoncePage implements OnInit {
  id!: number;
  canDelete: boolean = false;
  annonceId: any;
  annonce = {
    id: 1,
    titre: '',
    image: '',
    description: '',
    prix: 1200,
    localisation: '',
    date_publication: '',
    nom: '',
    email: '',
    phone: '',
  };

  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the annonce ID from the route parameters
    this.annonceId = this.route.snapshot.paramMap.get('id');

    if (this.annonceId) {
      // Fetch the specific annonce from Firestore
      this.firestore
        .collection('/annonces')
        .doc(this.annonceId)
        .valueChanges()
        .subscribe((annonce: any) => {
          this.annonce = annonce;
          this.afAuth.authState.subscribe((user) => {
            if (user && user.email === annonce.email) {
              this.canDelete = true;
            }
          });
          this.loaded = true;
          console.log('Annonce Details:', this.annonce);
        });
    } else {
      console.error('Annonce ID is null or undefined.');
    }
  }

  deleteAnnonceById() {
    const annonceRef = this.firestore
      .collection('/annonces')
      .doc(this.annonceId);

    annonceRef
      .delete()
      .then(() => {
        console.log('Annonce deleted successfully.');
        // Refresh the list after deletion
        this.router.navigate(['my-annonces']);
      })
      .catch((error) => {
        console.error('Error deleting annonce:', error);
      });
  }

  toUpdatePage() {
    this.router.navigate(['update-annonce', this.annonceId]);
  }
}

import { Component, OnInit } from '@angular/core';
import { annoncesList } from '../dummy.data';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.page.html',
  styleUrls: ['./annonce.page.scss'],
})
export class AnnoncePage implements OnInit {
  id!: number;
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
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    // Get the annonce ID from the route parameters
    const annonceId = this.route.snapshot.paramMap.get('id');

    if (annonceId) {
      // Fetch the specific annonce from Firestore
      this.firestore
        .collection('/annonces')
        .doc(annonceId)
        .valueChanges()
        .subscribe((annonce: any) => {
          this.annonce = annonce;
          this.loaded = true;
          console.log('Annonce Details:', this.annonce);
        });
    } else {
      console.error('Annonce ID is null or undefined.');
    }
  }
}

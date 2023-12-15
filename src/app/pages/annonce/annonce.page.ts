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
    titre: 'Appartement spacieux en centre-ville',
    image:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/425798448.jpg?k=d5a00140692c6c6a6e7ad3f6e52181e5a788844b0c1eb933f982aae62799df7f&o=&hp=1',
    description:
      'Magnifique appartement récemment rénové, situé en plein cœur du centre-ville. Vue imprenable sur la ville.',
    prix: 1200,
    localisation: 'Centre-ville',
    date_publication: '2023-01-15',

    nom: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '123-456-7890',
  };

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
          console.log('Annonce Details:', this.annonce);
        });
    } else {
      console.error('Annonce ID is null or undefined.');
    }
  }
}

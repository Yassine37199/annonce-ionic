import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-annonce',
  templateUrl: './update-annonce.page.html',
  styleUrls: ['./update-annonce.page.scss'],
})
export class UpdateAnnoncePage implements OnInit {
  imgSrc: String = '';
  annonceId: any;
  annonce: any;
  loaded = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.annonceId = this.route.snapshot.paramMap.get('id');

    if (this.annonceId) {
      // Fetch the specific annonce from Firestore
      this.firestore
        .collection('/annonces')
        .doc(this.annonceId)
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

  updateAnnonce(myForm: any) {
    if (this.annonceId) {
      // Update the annonce in Firestore
      this.firestore
        .collection('/annonces')
        .doc(this.annonceId)
        .update(myForm.value)
        .then(() => {
          console.log('Annonce updated successfully.');
          this.router.navigate(['my-annonces']);
        })
        .catch((error) => {
          console.error('Error updating annonce:', error);
        });
    } else {
      console.error('Annonce ID is null or undefined.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.page.html',
  styleUrls: ['./add-annonce.page.scss'],
})
export class AddAnnoncePage implements OnInit {
  imgSrc = '';
  userName = '';
  userEmail = '';
  userPhone = '';
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // If the user is authenticated, retrieve user data from Firestore
        this.firestore
          .collection('users')
          .doc(user.uid)
          .valueChanges()
          .subscribe((userData: any) => {
            console.log(userData);
            this.userEmail = userData.email;
            this.userName = userData.name;
            this.userPhone = userData.phone;
          });
      }
    });
  }

  addAnnonce(myForm: any) {
    if (myForm.valid) {
      // Extract data from the form
      const formData = myForm.value;

      formData.date_publication = this.formatDate(new Date());

      // Add data to Firestore collection 'annonces'
      this.firestore
        .collection('annonces')
        .add(formData)
        .then(() => {
          console.log('Annonce added successfully');
          // You can reset the form if needed
          myForm.resetForm();
          this.router.navigate(['my-annonces']);
        })
        .catch((error) => {
          console.error('Error adding annonce: ', error);
        });
    } else {
      console.log('Form is invalid. Please check your inputs.');
    }
  }

  // Helper function to format date as yyyy-mm-dd
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}

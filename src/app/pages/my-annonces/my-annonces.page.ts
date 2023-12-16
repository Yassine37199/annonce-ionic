import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { annoncesList } from '../dummy.data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Component({
  selector: 'app-my-annonces',
  templateUrl: './my-annonces.page.html',
  styleUrls: ['./my-annonces.page.scss'],
})
export class MyAnnoncesPage implements OnInit {
  myAnnoncesList: any;
  filteredAnnoncesList: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.getAnnonceByUserEmail();
  }

  navigateToAnnonce(id: any) {
    this.router.navigate(['annonce', id]);
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredAnnoncesList = this.myAnnoncesList.filter(
      (annonce: { titre: string }) => {
        return annonce.titre.toLowerCase().includes(searchTerm);
      }
    );
  }

  getAnnonceByUserEmail() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore
          .collection('/annonces', (ref) =>
            ref.where('email', '==', user.email)
          )
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
          .subscribe((data) => {
            console.log(data);
            this.myAnnoncesList = data;
            this.filteredAnnoncesList = data;
          });
      }
    });
  }

  toAddPage() {
    this.router.navigate(['add-annonce']);
  }
}

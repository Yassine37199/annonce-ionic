import { Component, OnInit } from '@angular/core';
import { annoncesList } from '../dummy.data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.page.html',
  styleUrls: ['./annonce.page.scss'],
})
export class AnnoncePage implements OnInit {
  annoncesList = annoncesList;
  id!: number;
  annonce: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // Get the 'id' parameter from the route
      this.id = Number(params.get('id'));
    });

    this.getAnnonceById();
  }

  getAnnonceById(): any {
    this.annonce = this.annoncesList.find((annonce) => annonce.id === this.id);
  }
}

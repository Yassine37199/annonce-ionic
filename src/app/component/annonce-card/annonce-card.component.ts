import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonce-card',
  templateUrl: './annonce-card.component.html',
  styleUrls: ['./annonce-card.component.scss'],
})
export class AnnonceCardComponent implements OnInit {
  @Input() annonce: any;

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToAnnonce() {
    this.router.navigate(['annonce', this.annonce.id]);
  }
}

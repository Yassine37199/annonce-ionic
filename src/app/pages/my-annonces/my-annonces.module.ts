import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAnnoncesPageRoutingModule } from './my-annonces-routing.module';

import { MyAnnoncesPage } from './my-annonces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAnnoncesPageRoutingModule
  ],
  declarations: [MyAnnoncesPage]
})
export class MyAnnoncesPageModule {}

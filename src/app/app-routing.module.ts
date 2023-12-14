import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'annonce/:id',
    loadChildren: () =>
      import('./pages/annonce/annonce.module').then((m) => m.AnnoncePageModule),
  },  {
    path: 'my-annonces',
    loadChildren: () => import('./pages/my-annonces/my-annonces.module').then( m => m.MyAnnoncesPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

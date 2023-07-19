import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';

const routes: Routes = [
  {
    path: APP_ROUTES.HOME_PAGE,
    component: HomePageComponent,
  },
  {
    path: `${APP_ROUTES.DETAILS_PAGE}/:imdbID`,
    component: DetailsPageComponent,
  },
  {
    path: APP_ROUTES.FAVORITES_PAGE,
    component: FavoritesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

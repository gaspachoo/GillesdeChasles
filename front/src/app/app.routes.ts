import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Poemes } from './pages/poemes/poemes';
import { Reflexions } from './pages/reflexions/reflexions';
import { Ailleurs } from './pages/ailleurs/ailleurs';
import { Vous } from './pages/vous/vous';

export const routes: Routes = [
    {
    path: '',
    component: Home,
  },
  {
    path: 'poemes',
    component: Poemes,
  },
  {
    path: 'reflexions',
    component: Reflexions,
  },
  {
    path: 'ailleurs',
    component: Ailleurs,
  },
  {
    path: 'vous',
    component: Vous,
  },
  
];

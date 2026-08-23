import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Ailleurs } from './pages/ailleurs/ailleurs';
import { Vous } from './pages/vous/vous';
import { ContentListComponent } from './components/content-list/content-list';

export const routes: Routes = [
    {
    path: '',
    component: Home,
  },
  {
    path: 'poemes',
    component: ContentListComponent,
    data: { contentType: 'poeme' },
  },
  {
    path: 'reflexions',
    component: ContentListComponent,
    data: { contentType: 'reflexion' },
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

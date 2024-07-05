import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './dashboards/default/default.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';




import { FormationComponent } from '../formation/formation.component';
import { EventComponent } from '../event/event.component';
import { HackathonComponent } from '../hackathon/hackathon.component';
import { VoteComponent } from '../vote/vote.component';

import { CreateFormationPopupComponent } from '../create-formation-popup/create-formation-popup.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { CreateHackathonComponent } from '../create-hackathon/create-hackathon.component';
import { CreateVoteComponent } from '../create-vote/create-vote.component';


import { EditVoteComponent } from '../edit-vote/edit-vote.component';
import { EditFormationComponent } from '../edit-formation/edit-formation.component';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { EditHackathonComponent } from '../edit-hackathon/edit-hackathon.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'formation', component: FormationComponent },
  { path: 'createformation', component: CreateFormationPopupComponent },
  { path: 'event', component: EventComponent },
  { path: 'vote', component: VoteComponent },
  { path: 'createevent', component: CreateEventComponent },
  { path: 'createhackathon', component: CreateHackathonComponent },
  { path: 'createvote', component: CreateVoteComponent },
  { path: 'hackathon', component: HackathonComponent },
  { path: 'editvote/:id', component:  EditVoteComponent},
  { path: 'editformation/:id', component:  EditFormationComponent},
  { path: 'editevent/:id', component:  EditEventComponent},
  { path: 'edithackathon/:id', component:  EditHackathonComponent},
  { path: 'dashboard', component: DefaultComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'filemanager', component: FilemanagerComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

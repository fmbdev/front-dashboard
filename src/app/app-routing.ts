import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { TablesComponent } from './tables/tables.component';
import { LoginComponent } from './auth/login/login.component';
import { ClientsComponent } from './clients/clients.component';
import { RegisterComponent } from './auth/register/register.component';
import { ExecutivesComponent } from './executives/executives.component';
import { TablesFormComponent} from './tables-form/tables-form.component';
import { ExecutiveListComponent } from './executive-list/executive-list.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path: 'executives',
        component: ExecutivesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'executive-list',
        component: ExecutiveListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tables',
        component: TablesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tablesform',
        component: TablesFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [AuthGuard]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule {}





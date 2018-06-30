import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// App Routing
import { AppRoutingModule } from './app-routing';

// Providers
import { AuthService } from './providers/auth.service';
import { RoleAccessService } from './providers/role-access.service';
import { TablesService } from './providers/tables.service';
import { ExecutiveService } from './providers/executive.service';
import { LeadsService } from './providers/leads.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Pipes
import { WeekOfYearPipe } from './pipes/week-of-year.pipe';

// Ngx Pagination
import {NgxPaginationModule} from 'ngx-pagination';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ExecutivesComponent } from './executives/executives.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TablesComponent } from './tables/tables.component';
import { ClientsComponent } from './clients/clients.component';
import { ExecutiveListComponent } from './executive-list/executive-list.component';
import { TablesFormComponent } from './tables-form/tables-form.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadsFormComponent } from './leads-form/leads-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ExecutivesComponent,
    NavbarComponent,
    TablesComponent,
    ClientsComponent,
    ExecutiveListComponent,
    TablesFormComponent,
    LeadsComponent,
    LeadsFormComponent,
    WeekOfYearPipe
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [AuthService, RoleAccessService, TablesService, ExecutiveService, LeadsService, WeekOfYearPipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

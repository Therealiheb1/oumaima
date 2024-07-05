import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { SharedModule } from './cyptolanding/shared/shared.module';

import { ExtrapagesModule } from './extrapages/extrapages.module';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFirebaseBackend } from './authUtils';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { FormationComponent } from './formation/formation.component';
import { EventComponent } from './event/event.component';
import { HackathonComponent } from './hackathon/hackathon.component';
import { CreateFormationPopupComponent } from './create-formation-popup/create-formation-popup.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateHackathonComponent } from './create-hackathon/create-hackathon.component';
import { CreateVoteComponent } from './create-vote/create-vote.component';
import { CreateComponent } from './create/create.component';
import { VoteComponent } from './vote/vote.component';
import { EditVoteComponent } from './edit-vote/edit-vote.component';
import { EditFormationComponent } from './edit-formation/edit-formation.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditHackathonComponent } from './edit-hackathon/edit-hackathon.component';
import { ReactiveFormsModule } from '@angular/forms';
if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CyptolandingComponent,
    FormationComponent,
    EventComponent,
    HackathonComponent,
    CreateFormationPopupComponent,
    CreateEventComponent,
    CreateHackathonComponent,
    CreateVoteComponent,
    CreateComponent,
    VoteComponent,
    EditVoteComponent,
    EditFormationComponent,
    EditEventComponent,
    EditHackathonComponent,
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbModalModule,
    NgbTooltipModule,
    SharedModule,
    FormsModule ,
    NgbModule,
    ScrollToModule.forRoot(),
    NgbModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    // LoaderService,
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],
})
export class AppModule { }

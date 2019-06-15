import { TranslationService } from './core/loader/translate.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AppInitService } from './core/loader/app-init.service';
import { LOCATION_INITIALIZED } from '@angular/common';


export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.init();
  };
}

export function translationInitializerFactory(
  translateService: TranslateService,
  translationService: TranslationService,
  injector: Injector) {


      return (): Promise<void> => {
        return translationService.init(translateService, injector);
      }
  }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/', '.json'
  )
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader : {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: translationInitializerFactory,
      deps: [
        TranslateService,
        TranslationService,
        Injector
      ],
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }


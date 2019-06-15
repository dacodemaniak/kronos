import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private _language: string;
  private _translateService: TranslateService;

  constructor() { }

  public init(translateService: TranslateService, injector: Injector): Promise<void> {
    return new Promise((resolve: any) => {
      injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => {
        const _navigatorLanguage: string = window.navigator.language;
        const _userLanguage: string = _navigatorLanguage.split('-')[0];
        this._language = /(fr|de|en|es)/gi.test(_userLanguage) ? _userLanguage : 'en';
        this._translateService = translateService;

        this.loadTranslations();

        resolve(null);
      });
    });
  }

  public loadTranslations(): void {
    this._translateService
      .use(this._language)
      .subscribe(() => {
        console.log(`Traductions  ${this._language} chargées avec succès`);
      },
      (error) => {
        console.error(`Erreur lors du chargement des traductions  ${this._language}`);
      });
  }
}

import { AuthenticationService } from '../authentication/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private authenticationService: AuthenticationService) { }

  public init(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('AppInitService::init() appelé !');
      this.authenticationService.init().then(() => {
        console.log('Local account resolved... let\'s play');
        resolve();
      });
    });
  }
}

import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private account: any;

  constructor() {
    console.log('Hello Authentication Service !');
   }

   public init(): Promise<any> {
     return new Promise<any>((resolve) => {
      setTimeout(() => {
        this.account = {
          token: 'abcdefg'
        };
        resolve(this.account);
      }, 1000);
     });
   }

   public isAuthenticated(): boolean {
     return this.account ? true : false;
   }
}

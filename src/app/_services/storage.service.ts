import {Inject, Injectable, InjectionToken} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export const STORAGE_SERVICE = new InjectionToken<StorageService>('STORAGE_SERVICE');

@Injectable()
export class StorageService {

  private realusername = new BehaviorSubject<string>('');

  constructor(@Inject(STORAGE_SERVICE) private storage: StorageService) {
    localStorage.clear();
  }

  public storeValue(key: string, value: string){
    localStorage.setItem(key, value);
  }

  public getValue(key: string) : string{
    return localStorage.getItem(key);
  }

  public removeValue(key: string){
    localStorage.removeItem(key);
  }

  public setRealUsername(realusername: string){
    this.realusername.next(realusername);
  }

  public getRealUsername(){
    return this.realusername;
  }
}

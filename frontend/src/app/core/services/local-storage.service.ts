import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveData(key: string, value: any) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }
}

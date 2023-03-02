import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerCounter: number = 0;
  private isSpinnerActive: Subject<boolean> = new BehaviorSubject(false);

  isSpinnerActive$: Observable<boolean> = this.isSpinnerActive.asObservable();

  startSpinner(): void {
    this.spinnerCounter++;
    if (this.spinnerCounter === 1) {
      this.isSpinnerActive.next(true);
    }
  }

  stopSpinner(): void {
    if (this.spinnerCounter <= 0) {
      return;
    }

    this.spinnerCounter--;
    if (this.spinnerCounter === 0) {
      this.isSpinnerActive.next(false);
    }
  }
}

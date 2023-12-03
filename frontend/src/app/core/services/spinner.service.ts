import {Injectable, Signal, WritableSignal, computed, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerCounter: WritableSignal<number> = signal(0);
  
  isSpinnerActive: Signal<boolean> = computed(() => this.spinnerCounter() > 0);

  startSpinner(): void {
    this.spinnerCounter.update((counter) => counter + 1);
  }

  stopSpinner(): void {
    if (this.spinnerCounter() <= 0) {
      return;
    }

    this.spinnerCounter.update((counter) => counter - 1);
  }
}

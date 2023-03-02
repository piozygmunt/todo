import {Injectable, Injector, OnDestroy} from '@angular/core';
import {Router, RouterStateSnapshot, TitleStrategy} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";

@Injectable()
export class CustomTitleStrategyService extends TitleStrategy implements OnDestroy {

  private languageSubscription: Subscription;

  constructor(private translateService: TranslateService,
              private title: Title,
              private injector: Injector) {
    super();
    this.languageSubscription = this.translateService.onLangChange.subscribe(() => {
      this.updateTitle(this.injector.get(Router).routerState.snapshot)
    });
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    const translateKey = this.buildTitle(snapshot) as string;
    this.title.setTitle(this.translateService.instant(translateKey));
  }

  ngOnDestroy() {
    this.languageSubscription?.unsubscribe();
  }
}

import {Injectable, Injector, OnDestroy, inject} from '@angular/core';
import {Router, RouterStateSnapshot, TitleStrategy} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Injectable()
export class CustomTitleStrategyService extends TitleStrategy {
  private translateService: TranslateService = inject(TranslateService);
  private title: Title = inject(Title);
  private injector: Injector = inject(Injector);

  constructor() { 
    super();
    this.translateService.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => {
      this.updateTitle(this.injector.get(Router).routerState.snapshot)
    });
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    const translateKey = this.buildTitle(snapshot) as string;
    this.title.setTitle(this.translateService.instant(translateKey));
  }
}

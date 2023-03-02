import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, TitleStrategy} from "@angular/router";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {SpinnerInterceptor} from "./interceptors/spinner.interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NavbarComponent} from './components/navbar/navbar.component';
import {CustomTitleStrategyService} from "./services/custom-title-strategy.service";

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatProgressSpinnerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    {provide: TitleStrategy, useClass: CustomTitleStrategyService}
  ]
})
export class CoreModule {
}

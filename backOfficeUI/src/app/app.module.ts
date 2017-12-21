import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

/////
import { AppConfigService } from './app-config/app-config.service';
import { UserLoader } from './shared/state/user/user-loader';
import { AppComponent } from './app.component';
import { ApiService } from './shared/api.service';
import { routing } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';
import { SettingsModule } from './settings/settings.module';
import { DataAccessModule } from '../infrastructure/data-access/data-access.module';
import { SharedStateModule } from './shared/state/shared-state.module';
import { Store } from './shared/state/store';
import { DataProvidersFactoryProvider }
    from '../infrastructure/data-access/data-providers/data-providers-factory-provider';

import { configureState } from './shared/state/state-config';
import { RootStateInterface } from './shared/state/root-state-interface';
import { User } from './shared/state/user/user';

import './app.global.scss';

function configureStateAndSetCurrentUser(store: Store<RootStateInterface>, user: User) {
  configureState(store, { currentUser: user });
}

export function initConfig(
          appConfigService: AppConfigService,
          store: Store<RootStateInterface>,
          factoryProvider: DataProvidersFactoryProvider,
          currentUserLoader: UserLoader
) {
return () => appConfigService.load().then(() => {
  const settings = {
      apiEndpoint: appConfigService.getApiEndpoint(),
      options: {
      withCredentials: true
    }
  };
  factoryProvider.configure(settings);
  return currentUserLoader.load(appConfigService.getApiEndpoint())
  .then(
      currentUser => {
          configureStateAndSetCurrentUser(store, currentUser);
      },
      e => {
        console.log('error load user');
      });
    });
  }

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    AuthModule,
    CommonModule,
    LayoutModule,
    SettingsModule,
    DataAccessModule,
    SharedStateModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    ApiService,
    AppConfigService,
    UserLoader,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService, Store, DataProvidersFactoryProvider, UserLoader],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

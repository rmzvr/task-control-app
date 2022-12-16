import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BoardTileComponent } from './components/board-tile/board-tile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthInterceptor } from '@features/login/interceptors/auth.interceptor';

@NgModule({
  declarations: [DashboardComponent, BoardTileComponent],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  exports: [DashboardComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class DashboardModule {}

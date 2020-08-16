import { CarouselComponent } from './components/carousel/carousel.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { TrendMgmtComponent } from './components/trend-mgmt/trend-mgmt.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'add', // child route path
        component: AddProductComponent// child route component that the router renders
      },
      {
        path: 'edit/:id',
        component: EditProductComponent // another child route component that the router renders
      },
      {
        path: 'order',
        component: OrdersComponent // another child route component that the router renders
      },
      {
        path: 'olist',
        component: OrderListComponent // another child route component that the router renders
      },
      {
        path: 'all',
        component: ProductListComponent // another child route component that the router renders
      },
      {
        path: '',
        component: OrdersComponent // another child route component that the router renders
      },
      {
        path: 'trend',
        component: TrendMgmtComponent // another child route component that the router renders
      },
      {
        path: 'crl',
        component: CarouselComponent // another child route component that the router renders
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

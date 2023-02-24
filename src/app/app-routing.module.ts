import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LoginComponent } from './admin/components/login/login.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { LayoutComponent as UiLayoutComponent } from './ui/layout/layout.component';
import { LoginGuard } from './guards/admin/login.guard';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent,canActivate:[LoginGuard] },//ana sayfa niteliğinde olduğu için doğrudan componenti veriyoruz
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule) },
      { path: "auth", loadChildren: () => import("./admin/components/auth/auth.module").then(module => module.AuthModule) },

    ],canActivate:[LoginGuard],data:{expectedRoles:["Admin"]}
  },
  {
    path:"",component:UiLayoutComponent,children:[
      {path:"",component:HomeComponent},
      {path:"products",loadChildren:()=>import("./ui/components/products/products.module").then(module=>module.ProductsModule)},
      {path:"login",loadChildren:()=>import("./ui/components/login/login.module").then(module=>module.LoginModule)},
      {path:"register",loadChildren:()=>import("./ui/components/register/register.module").then(module=>module.RegisterModule)}
    ]
  },
  { path: "admin/login", component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

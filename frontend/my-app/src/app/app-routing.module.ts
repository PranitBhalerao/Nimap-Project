import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'products', component: ProductComponent },
  { path: 'products/:categoryId', component: ProductComponent },
  // { path: '**', redirectTo: '/home' } // Redirect any other route to the home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

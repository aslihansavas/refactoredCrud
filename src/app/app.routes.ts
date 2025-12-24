import { Routes } from '@angular/router';
import { CategoryOperation } from './myComponents/category-operation/category-operation';
import { ProductOperation } from './myComponents/product-operation/product-operation';
export const routes: Routes = [
    {path:'',component:CategoryOperation},
    {path:'categories',component:CategoryOperation},
    {path:'products',component:ProductOperation},
];

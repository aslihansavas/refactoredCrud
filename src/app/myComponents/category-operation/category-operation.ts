import { Component,signal,inject,OnInit } from '@angular/core';
import { AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { CategoryApi } from '../../DataAccess/category-api';
import { CategoryResponseModel } from '../../Models/Categories/CategoryResponseModel';
import { createCategoryForm,toCreateCategoryRequest } from '../../Validations/Categories/CreateCategoryFormFactory';
import { updateCategoryForm,toUpdateCategoryRequest } from '../../Validations/Categories/UpdateCategoryFormFactory';

@Component({
  selector: 'app-category-operation',
  imports: [ReactiveFormsModule],
  templateUrl: './category-operation.html',
  styleUrl: './category-operation.css',
})
export class CategoryOperation {

  

}

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
export class CategoryOperation implements OnInit {
  private categroyApi=inject(CategoryApi);
  protected categories =signal<CategoryResponseModel[]>([]);
  protected selectedCategory =signal<CategoryResponseModel |null>(null);
  //UI State formları

  protected createform =createCategoryForm();
  protected updateform=updateCategoryForm();
  private async refreshCategories():Promise<void>{
    try {
      const values=await this.categroyApi.getAll();
      this.categories.set(values);
    } catch (error) {
      console.log("Kategori Listesi Alınamadı.",error);
    }
  }
  async ngOnInit():Promise<void> {
    await this.refreshCategories();

  }
  //Create İşlemleri
  async onCreate():Promise<void>{
    if(this.createform.invalid){
      this.createform.markAllAsTouched();
      return;
    }
    const req=toCreateCategoryRequest(this.createform);
    await this.categroyApi.create(req);
    this.createform.reset();
    await this.refreshCategories();
  }
  //Update İşlemleri
  startUpdate(cat:CategoryResponseModel){
    this.selectedCategory.set(cat);
    this.updateform.patchValue({
      id:cat.id,
      name:cat.categoryName,
      description:cat.description,
      },
        {emitEvent:false}
    );
  }
  cancelUpdate(){
    this.selectedCategory.set(null);
    this.updateform.reset({id:0,name:'',description:''});
  }
  async onUpdate(){
    if(this.updateform.invalid){
      this.updateform.markAllAsTouched();
      return;
    }
    const req =toUpdateCategoryRequest(this.updateform);
    await this.categroyApi.update(req);
    this.cancelUpdate();
    await this.refreshCategories();
  }

  //Delete
  async onDelete(id:number):Promise<void>{
    const confirmDelete=window.confirm(`Id'si ${id} olan kategoriyi silmek istecdiinzen emin misiniz`);
    if(!confirmDelete) return;
    try {
      const message= await this.categroyApi.deleteByID(id);
      console.log('delete mesajı',message);

      this.categories.update((x)=>x.filter((c)=>c.id!==id));

      const selected=this.selectedCategory();
      if(selected&&selected.id===id){
        this.selectedCategory.set(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  protected labels:Record<string,string> ={
    name :'Kategori Adı',
    description :'Açıklama',
    id:'id',
  };

  protected getErrorMessage(control:AbstractControl | null,label='BU ALAN'):string |null{
    if(!control || (!control.touched && !control.dirty) || !control.invalid) return null;
    else if(control.hasError('required')) return `${label} zorunludur.`;
    else if(control.hasError('minlength')){
      const e =control.getError('minlength');
      return `${label} en az ${e.requiredLength} karakter olmalıdır.`;
    }
    else if(control.hasError('maxlength')){
      const e=control.getError('maxlength');
      return `${label} en fazla ${e.requiredLength} karakter olmalıdır.`;
    }
    return `${label} geçersiz`;
  }

  protected getErrorMessageByName(form:{controls:Record<string,AbstractControl>},controlName:string):string |null{
    const control=form.controls[controlName];
    const label = this.labels[controlName]??controlName;
    return this.getErrorMessage(control,label);
  }
}

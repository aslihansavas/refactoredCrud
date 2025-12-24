import { Component,signal,inject,OnInit } from '@angular/core';
import { AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { ProductApi } from '../../DataAccess/product-api';
import { ProductResponseModel } from '../../Models/Products/ProductResponseModel';
import { createProductForm,toCreateProductRequest } from '../../Validations/Products/CreateProductFormFactory';
import { updateProductForm,toUpdateProductRequest } from '../../Validations/Products/UpdateProductFormFactory';
@Component({
  selector: 'app-product-operation',
  imports: [ReactiveFormsModule],
  templateUrl: './product-operation.html',
  styleUrl: './product-operation.css',
})
export class ProductOperation implements OnInit {
 private productApi=inject(ProductApi);
  protected products =signal<ProductResponseModel[]>([]);
  protected selectedProduct =signal<ProductResponseModel |null>(null);
  //UI State formları

  protected createform =createProductForm();
  protected updateform=updateProductForm();
  private async refreshProducts():Promise<void>{
    try {
      const values=await this.productApi.getAll();
      this.products.set(values);
    } catch (error) {
      console.log("Ürün Listesi Alınamadı.",error);
    }
  }
  async ngOnInit():Promise<void> {
    await this.refreshProducts();

  }
  //Create İşlemleri
  async onCreate():Promise<void>{
    if(this.createform.invalid){
      this.createform.markAllAsTouched();
      return;
    }
    const req=toCreateProductRequest(this.createform);
    await this.productApi.create(req);
    this.createform.reset();
    await this.refreshProducts();
  }
  //Update İşlemleri
  startUpdate(pro:ProductResponseModel){
    this.selectedProduct.set(pro);
    this.updateform.patchValue({
      id:pro.id,
      productName:pro.productName,
      unitPrice:pro.unitprice,
      categoryId:pro.categoryId,
      },
        {emitEvent:false}
    );
  }
  cancelUpdate(){
    this.selectedProduct.set(null);
    this.updateform.reset({id:0,productName:'',unitPrice:0,categoryId:0});
  }
  async onUpdate(){
    if(this.updateform.invalid){
      this.updateform.markAllAsTouched();
      return;
    }
    const req =toUpdateProductRequest(this.updateform);
    await this.productApi.update(req);
    this.cancelUpdate();
    await this.refreshProducts();
  }

  //Delete
  async onDelete(id:number):Promise<void>{
    const confirmDelete=window.confirm(`Id'si ${id} olan ürünü silmek istecdiinzen emin misiniz`);
    if(!confirmDelete) return;
    try {
      const message= await this.productApi.deleteByID(id);
      console.log('delete mesajı',message);

      this.products.update((x)=>x.filter((p)=>p.id!==id));

      const selected=this.selectedProduct();
      if(selected&&selected.id===id){
        this.selectedProduct.set(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  protected labels:Record<string,string> ={
    productName :'Ürün Adı',
    unitPrice :'Fiyat',
    id:'id',
    categoryId:'Kategori ID',
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
    else if(control.hasError('min')){
      const e=control.getError('min');
      return `${label} Ürün fiyatı 0 dan az olamaz`;
    }
    else if(control.hasError('max')){
      const e=control.getError('max');
      return `${label} Ürün fiyatı çok fazla`;
    }
    return `${label} geçersiz`;
  }

  protected getErrorMessageByName(form:{controls:Record<string,AbstractControl>},controlName:string):string |null{
    const control=form.controls[controlName];
    const label = this.labels[controlName]??controlName;
    return this.getErrorMessage(control,label);
  }



}

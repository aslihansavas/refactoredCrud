import { BaseProductsViewModel } from "./BaseProductViewModel";
export class CreateProductRequestModel extends BaseProductsViewModel{
    constructor(productName:string,unitPrice:number,categoryId:number){
        super(productName,unitPrice,categoryId);
    }
}
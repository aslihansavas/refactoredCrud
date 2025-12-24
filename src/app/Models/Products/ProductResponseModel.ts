import { BaseProductsViewModel } from "./BaseProductViewModel";
export class ProductResponseModel extends BaseProductsViewModel{
    id:number;
    constructor(productName:string,unitPrice:number,id:number,categoryId:number){
        super(productName,unitPrice,categoryId);
        this.id=id;
    }
}
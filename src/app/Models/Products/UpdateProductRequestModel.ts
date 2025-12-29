import { BaseProductsViewModel } from "./BaseProductViewModel";
export class UpdateProductRequestModel extends BaseProductsViewModel{
    id:number;
    constructor(id:number,productName:string,unitPrice:number,categoryId:number){
        super(productName,unitPrice,categoryId);
        this.id=id;
    }
}
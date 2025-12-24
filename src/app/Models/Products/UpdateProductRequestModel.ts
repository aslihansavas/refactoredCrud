import { BaseProductsViewModel } from "./BaseProductViewModel";
export class UpdateProductRequestModel extends BaseProductsViewModel{
    id:number;
    constructor(id:number,productName:string,unitPrice:number,categoryId:number){
        super(productName,categoryId,unitPrice);
        this.id=id;
    }
}
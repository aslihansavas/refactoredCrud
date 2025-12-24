export abstract class BaseProductsViewModel{
    productName:string;
    unitprice:number;
    categoryId:number;
    constructor(productName:string,unitprice:number,categoryId:number){
        this.productName=productName;
        this.unitprice=unitprice;
        this.categoryId=categoryId;
    }

}
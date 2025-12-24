import { BaseCategoryViewModel } from "./BaseCategoryViewModel";
export class CategoryResponseModel extends BaseCategoryViewModel{
    id:number;
    constructor(id:number,categoryName:string,description:string){
        super(categoryName,description);
        this.id=id;
    }
}
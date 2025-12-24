import { BaseCategoryViewModel } from "./BaseCategoryViewModel";
export class CreateCategoryRequestModel extends BaseCategoryViewModel{
    constructor(categoryName:string,description:string){
        super(categoryName,description);
    }
}
export abstract class BaseCategoryViewModel{
    categoryName:string;
    description:string;
    constructor(categoryName:string,description:string){
        this.categoryName=categoryName;
        this.description=description;
    }
}
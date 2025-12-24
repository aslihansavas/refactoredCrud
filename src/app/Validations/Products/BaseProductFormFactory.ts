import { FormControl } from "@angular/forms";
import { Productvalidators } from "./ProductValidators";

export type BaseProductForm={
    productName:FormControl<string>;
    unitPrice:FormControl<number>;
    categoryId:FormControl<number>;

};

export function baseProductForm():BaseProductForm{
    return{
        productName:new FormControl<string>('',{nonNullable:true,validators:Productvalidators.productName()}),
        unitPrice:new FormControl<number>(0,{nonNullable:true,validators:Productvalidators.unitPrice()}),
        categoryId:new FormControl<number>(0,{nonNullable:true,validators:Productvalidators.categoryId()}),
    };
};
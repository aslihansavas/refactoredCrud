import { FormControl } from "@angular/forms";
import { Categoryvalidators } from "./CategoryValidators";

export type BaseCategoryForm={
    name:FormControl<string>;
    description:FormControl<string>;

};

export function baseCategoryForm():BaseCategoryForm{
    return{
        name:new FormControl<string>('',{nonNullable:true,validators:Categoryvalidators.name()}),
        description:new FormControl<string>('',{nonNullable:true,validators:Categoryvalidators.description()}),
    };
};
import { FormGroup ,FormControl,Validators} from "@angular/forms";
import { UpdateCategoryRequestModel } from "../../Models/Categories/UpdateCategoryRequestModel";
import { baseCategoryForm } from "./BaseCategoryFormFactory";

export type UpdateCategoryForm = FormGroup<{
    id:FormControl<number>;
    name:FormControl<string>;
    description:FormControl<string>;

}>;
export function updateCategoryForm(){
    const base=baseCategoryForm();
    base.name.addValidators([Validators.maxLength(50)]);
    base.name.updateValueAndValidity({emitEvent:false});
    return new FormGroup({
        id:new FormControl(0,{nonNullable:true,validators:[Validators.required,Validators.min(1)]}),
        ...base,
    });
};

export function toUpdateCategoryRequest(form:UpdateCategoryForm):UpdateCategoryRequestModel{
    return{
        id:form.controls.id.value,
        categoryName:form.controls.name.value,
        description:form.controls.description.value,
    };
};
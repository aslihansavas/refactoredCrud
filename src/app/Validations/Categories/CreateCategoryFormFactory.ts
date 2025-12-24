import { FormGroup } from "@angular/forms";
import { CreateCategoryRequestModel } from "../../Models/Categories/CreateCategoryRequestModel";
import { baseCategoryForm } from "./BaseCategoryFormFactory";


export type CreateCategoryForm = FormGroup<ReturnType<typeof baseCategoryForm>>;

export function createCategoryForm():CreateCategoryForm{
    return new FormGroup(baseCategoryForm());
}

export function toCreateCategoryRequest(form:CreateCategoryForm):CreateCategoryRequestModel{
    return{
        categoryName:form.controls.name.value,
        description:form.controls.description.value,
    };
};
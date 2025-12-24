import { FormGroup } from "@angular/forms";
import { baseProductForm, BaseProductForm } from "./BaseProductFormFactory";
import { CreateProductRequestModel } from "../../Models/Products/CreateProductRequestModel";

export type CreateProductForm = FormGroup<ReturnType<typeof baseProductForm>>;
export function createProductForm() : CreateProductForm{
    return new FormGroup(baseProductForm ());
}
export function toCreateProductRequest(form:CreateProductForm):CreateProductRequestModel{
    return{
        productName:form.controls.productName.value,
        unitprice:form.controls.unitPrice.value,
        categoryId:form.controls.categoryId.value,
    };
};

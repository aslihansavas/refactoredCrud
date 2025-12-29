import { Validators,ValidatorFn } from "@angular/forms";

export const Productvalidators={
    productName:():ValidatorFn[]=>[
        Validators.required,
        Validators.minLength(3),
    ],
    unitPrice:():ValidatorFn[] =>[
        Validators.required,
        Validators.min(0),
        Validators.max(10000),
    ],
    categoryId:():ValidatorFn[] =>[
        Validators.required,
        Validators.min(1),
    ],
}
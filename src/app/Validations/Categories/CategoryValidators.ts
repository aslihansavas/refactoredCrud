import { Validators,ValidatorFn } from "@angular/forms";

export const Categoryvalidators={
    name:():ValidatorFn[]=>[
        Validators.required,
        Validators.minLength(3),
    ],
    description:():ValidatorFn[] =>[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
    ],
}
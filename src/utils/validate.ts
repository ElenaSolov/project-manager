import {IIsValid} from "../types/types.js";

export function validate (input: IIsValid) : boolean {
    let isValid = true;
    if(input.required) {
        isValid = isValid&& input.value.toString().trim().length !==0;
    }
    if(typeof input.value === 'string') {
        if (input.maxLength != null) {
            isValid = isValid && input.value.length < input.maxLength;
        }
        if (input.minLength != null) {
            isValid = isValid && input.value.length > input.minLength;
        }
    } else {
        if (input.min) {
            isValid = isValid && (input.value > input.min);
        }
        if (input.max) {
            isValid = isValid && (input.value > input.max);
        }
    }
    return isValid;
}
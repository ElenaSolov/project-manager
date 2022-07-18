import Project from "../Project";

export interface IIsValid {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
export type TListener = (projects : Project[])=> void;

export enum projectStatus {active = 'active', finished = 'finished'}
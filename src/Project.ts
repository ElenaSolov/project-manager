import { projectStatus } from './types/types';

class Project {
    public id: number = Math.random();
    constructor(public title: string, public description: string, public numOfPeople : number, public status: projectStatus){
    }
}

export default Project;
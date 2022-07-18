import Project from "./Project";
import {projectStatus, TListener} from "./types/types";

class ProjectState {
    private listeners : TListener[] = [];
    private projects : Project[] = [];
    private static instance: ProjectState;
    private constructor () {
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(title, description, numOfPeople, projectStatus.active);
        console.log(newProject)
        this.projects.push(newProject);
        for (const fn of this.listeners){
            fn(this.projects.slice());
        }
        console.log(this.projects)
    }
    public static getInstance (){
        if (this.instance){
            return this.instance;
        }
        this.instance =  new ProjectState();
        return this.instance;
    }
    addListeners(listenerFn : TListener) {
        this.listeners.push(listenerFn);
    }
}
export default ProjectState;

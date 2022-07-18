import Project from "./Project.js";
import {projectStatus, TListener} from "./types/types.js";

class ProjectState {
    private listeners : TListener[] = [];
    private projects : Project[] = [];
    private static instance: ProjectState;
    private constructor () {
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
    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(title, description, numOfPeople, projectStatus.active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(id: string, newStatus: projectStatus){
        const project = this.projects.find(prj => prj.id === +id);
        if(project&&project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }

    }

    private updateListeners(){
        for (const fn of this.listeners){
            fn(this.projects.slice());
        }
    }
}
export default ProjectState;

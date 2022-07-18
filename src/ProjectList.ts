import Project from "./Project.js";
import Component from "./Component.js";
import {projectStatus} from "./types/types.js";
import ProjectState from "./ProjectState.js";


class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[] = [];

    constructor(private type: projectStatus) {
        super("project-list", "app", false, `${type}-projects` )
        const projectState = ProjectState.getInstance();
        projectState.addListeners((projects :Project[])=> {
            this.assignedProjects = projects.filter(prj => prj.status.toString() === type);
            this.renderProjects();
        })
        this.addContent();
    }

    addContent(){
        this.element.querySelector('ul')!.id = `${this.type}-project-list`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement;
        listEl.innerHTML = '';
        console.log(listEl)
        for(const prj of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = prj.title;
            listEl.appendChild(listItem);
        }
    }
}

export default ProjectList;
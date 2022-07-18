import Project from "./Project.js";
import Component from "./Component.js";
import {projectStatus} from "./types/types.js";
import ProjectState from "./ProjectState.js";
import {IDragTarget} from "./interfaces/dnd.js";
import ProjectItem from "./ProjectItem.js";
import {autobind} from "./decorators/autobind.js";


class ProjectList extends Component<HTMLDivElement, HTMLElement> implements IDragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: projectStatus) {
        super("project-list", "app", false, `${type}-projects` )
        const projectState = ProjectState.getInstance();
        projectState.addListeners((projects :Project[])=> {
            this.assignedProjects = projects.filter(prj => prj.status.toString() === type);
            this.renderProjects();
        })
        this.addContent();
        this.setEventListeners();
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
            new ProjectItem(prj, this.type);
        }
    }

    handleDragLeave(event: DragEvent): void {
        console.log(event)
    }
    @autobind
    handleDragOver(event: DragEvent): void {
        console.log(this.element)
        this.element.querySelector('ul')!.classList.add('droppable');
        console.log(event)

    }

    handleDrop(event: DragEvent): void {
        console.log(event)
    }
    setEventListeners(){
        this.element.addEventListener('dragover', this.handleDragOver);
        this.element.addEventListener('dragleave', this.handleDragLeave);
        this.element.addEventListener('drop', this.handleDrop);
    }
}

export default ProjectList;
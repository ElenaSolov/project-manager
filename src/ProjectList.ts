import Project from "./Project.js";
import Component from "./Component.js";
import {projectStatus} from "./types/types.js";
import ProjectState from "./ProjectState.js";
import {IDragTarget} from "./interfaces/dnd.js";
import ProjectItem from "./ProjectItem.js";
import {autobind} from "./decorators/autobind.js";


class ProjectList extends Component<HTMLDivElement, HTMLElement> implements IDragTarget {
    assignedProjects: Project[] = [];
    private projectState: ProjectState;

    constructor(private type: projectStatus) {
        super("project-list", "app", false, `${type}-projects` )
        this.projectState = ProjectState.getInstance();
        this.projectState.addListeners((projects :Project[])=> {
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
        for(const prj of this.assignedProjects){
            new ProjectItem(prj, this.type);
        }
    }
    @autobind
    handleDragOver(event: DragEvent): void {
        if(event.dataTransfer&&event.dataTransfer.types){
            event.preventDefault();
            this.element.querySelector('ul')!.classList.add('droppable');
        }
    }

    @autobind
    handleDragLeave(_: DragEvent): void {
        this.element.querySelector('ul')!.classList.remove('droppable');
    }

    @autobind
    handleDrop(event: DragEvent): void {
        const prjId = event.dataTransfer!.getData('id');
        this.projectState.moveProject(prjId, this.type)
    }

    setEventListeners(){
        this.element.addEventListener('dragover', this.handleDragOver);
        this.element.addEventListener('dragleave', this.handleDragLeave);
        this.element.addEventListener('drop', this.handleDrop);
    }
}

export default ProjectList;
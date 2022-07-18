import Component from "./Component.js";
import Project from "./Project.js";
import {IDraggable} from "./interfaces/dnd.js";

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements IDraggable {
    private project: Project;
    get persons() {
        if(this.project.numOfPeople === 1){
            return '1 person'
        }
        return `${this.project.numOfPeople} persons`
    }
    handleDragStart(event: DragEvent) {
        console.log(event)
    }
    handleDragEnd(event: DragEvent) {
        console.log(event)

    }


    constructor(project: Project, type : string){
        super('single-project', `${type}-project-list`, true, `${project.id}`);
        this.project=project;
        this.addContent();
        console.log(this.element);
        this.setEventListeners();
    }

    addContent(): void {
        const content = `<h2>${this.project.title}</h2>
        <p>${this.project.description}</p>
        <p>${this.persons} assigned</p>`
        this.element.insertAdjacentHTML('afterbegin', content );
    }

    setEventListeners(){
        this.element.addEventListener('dragstart', this.handleDragStart);
        this.element.addEventListener('dragend', this.handleDragEnd);
    }
}
export default ProjectItem;

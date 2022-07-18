import Component from "./Component.js";
import Project from "./Project.js";
import {IDraggable} from "./interfaces/dnd.js";
import {autobind} from "./decorators/autobind.js";

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements IDraggable {
    private project: Project;
    get persons() {
        if(this.project.numOfPeople === 1){
            return '1 person'
        }
        return `${this.project.numOfPeople} persons`
    }
    @autobind
    handleDragStart(event: DragEvent) {
        event.dataTransfer!.effectAllowed = 'move';
        event.dataTransfer!.setData('id', this.project.id.toString())
    }
    handleDragEnd(_: DragEvent) {
    }


    constructor(project: Project, type : string){
        super('single-project', `${type}-project-list`, true, `${project.id}`);
        this.project=project;
        this.addContent();
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

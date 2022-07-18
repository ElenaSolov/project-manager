import Component from "./Component.js";
import Project from "./Project.js";

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>{
    private project: Project;

    constructor(project: Project, type : string){
        super('single-project', `${type}-project-list`, true, `${project.id}`);
        this.project=project;
        this.addContent();
        console.log(this.element)
    }

    addContent(): void {
        const content = `<h2>${this.project.title}</h2>
        <p>${this.project.description}</p>
        <p>Number of people: ${this.project.numOfPeople}</p>`
        this.element.insertAdjacentHTML('afterbegin', content );
    }

}
export default ProjectItem;

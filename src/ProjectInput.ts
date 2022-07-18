import {autobind} from "./decorators/autobind.js";
import Component from "./Component.js";
import {IIsValid } from "./types/types.js";
import {validate} from "./utils/validate.js";
import ProjectState from "./ProjectState.js";

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

    addContent(): void {}
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        super("project-input", "app", true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.setEventListeners();
    }

    private getInputValues() {
        const titleValue = this.titleInputElement.value;
        const descriptionValue = this.descriptionInputElement.value;
        const peopleValue = this.peopleInputElement.value;

        const titleRequirements: IIsValid = {
            value: titleValue,
            required: true,
            minLength: 5,
            maxLength: 15
        }
        const descriptionRequirements: IIsValid = {
            value: descriptionValue,
            required: true,
            minLength: 5,
            maxLength: 300
        }
        const peopleRequirements: IIsValid = {
            value: peopleValue,
            required: true,
            min: 0,
            max: 80
        }
        if(validate(titleRequirements)&&validate(descriptionRequirements)&&validate(peopleRequirements)){
            return [titleValue, descriptionValue, peopleValue];

        } else {
            alert("Please enter valid value");
            return undefined;
        }
    }
    @autobind
    private handleFormSubmit (evt : Event ) {
        evt.preventDefault()
        const userInput = this.getInputValues();
        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            const projectState = ProjectState.getInstance();
            projectState.addProject(title, desc, +people);
            this.clearInputs();
        }
    }

    private setEventListeners() {
        this.element.addEventListener('submit', this.handleFormSubmit);
    }
    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value= '';
    }
}
export default ProjectInput;
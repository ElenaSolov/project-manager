
abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    protected constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string,
    ) {
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as T;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if(newElementId) this.element.id = newElementId;

        this.render(insertAtStart);
    }

    private render(insertAtBeginning : boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning? 'afterbegin' : 'beforeend', this.element );
    }
    abstract addContent(): void;
}
export default Component;
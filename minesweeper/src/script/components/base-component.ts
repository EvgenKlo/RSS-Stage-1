export class BaseComponent<T extends HTMLElement> {
    private readonly tag: string;
    private readonly _classes: string[];
    protected readonly component: T;

    constructor(tag: string, classes: string[] = []) {
        this.tag = tag;
        this._classes = classes;
        this.component = this.createComponent();
    }

    protected createComponent() {
        const component = document.createElement(this.tag) as T;
        component.classList.add(...this._classes);
        return component;
    }

    public getComponent() {
        return this.component;
    }

    public addClassName(className: string) {
        if (!this._classes.includes(className)) {
            this._classes.push(className);
            this.component.classList.add(className);
        }
    }

    public removeClassName(className: string) {
        const index = this._classes.indexOf(className);
        if (index > -1) {
            this._classes.splice(index, 1);
            this.component.classList.remove(className);
        }
    }

    public toggleClassName(className: string) {
        const index = this._classes.indexOf(className);
        if (index > -1) {
            this.removeClassName(className);
        } else {
            this.addClassName(className);
        }
    }

    public get classes() {
        return this._classes;
    }
}

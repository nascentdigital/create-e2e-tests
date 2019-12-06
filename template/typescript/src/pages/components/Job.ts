// imports
import {Component, Container, Layout} from "@nascentdigital/wdio-extend";
import {BodyCopy, TitleSans} from "styles";


// class definition
export class Job extends Component {

    constructor(parent: Container) {
        super(parent, `*[data-component="Job"]`);
    }


    public get title() {
        return Component.create(this, `*[data-name="title"]`, "title")
            .withStyle(TitleSans);
    }

    public get caption() {
        return Component.create(this, `*[data-name="caption"]`, "caption")
            .withStyle(BodyCopy);
    }

    public get button() {
        return new Component(this, `*[data-name="button"]`, "button");
    }

    protected declareLayout(): Layout | null {
        return Layout
            .xs()
                .layout(this.title).above(this.caption)
                .layout(this.caption).above(this.button)
            .md()
                .layout(this.title).leftOf(this.caption)
                .layout(this.caption).leftOf(this.button)
            .done();
    }
}

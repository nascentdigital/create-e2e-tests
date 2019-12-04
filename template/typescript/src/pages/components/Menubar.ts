// imports
import {Component, Container, Layout} from "@nascentdigital/e2e-wdio";
import {MenubarLink} from "./MenubarLink";


// constants
export const MenubarLinkNames: MenubarLinkName[] = ["processLink", "workLink", "careersLink"];


// types + interfaces
export type MenubarLinkName = "processLink" | "workLink" | "careersLink";


// class definition
export class Menubar extends Component {

    constructor(parent: Container, name: string) {
        super(parent, `*[data-component="${name}"]`, name);
    }


    public get processLink() {
        return new MenubarLink(this, "processLink");
    }

    public get workLink() {
        return new MenubarLink(this, "workLink");
    }

    public get careersLink() {
        return new MenubarLink(this, "careersLink");
    }

    public get button() {
        return new Component(this, `*[data-name="button"]`, "button");
    }

    protected declareLayout(): Layout | null {
        return Layout
            .xs()
            .sm()
                .layout(this.processLink).leftOf(this.workLink)
                .layout(this.workLink).leftOf(this.careersLink)
            .done();
    }
}

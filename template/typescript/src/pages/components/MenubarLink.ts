// imports
import {Component} from "@nascentdigital/e2e-wdio";


// class definition
export class MenubarLink extends Component {

    constructor(parent: Component, name: string) {

        // call base constructor
        super(parent, `*[data-name="${name}"]`, name);
    }
}

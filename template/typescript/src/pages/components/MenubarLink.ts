// imports
import {Component} from "@nascentdigital/wdio-extend";


// class definition
export class MenubarLink extends Component {

    constructor(parent: Component, name: string) {

        // call base constructor
        super(parent, `*[data-name="${name}"]`, name);
    }
}

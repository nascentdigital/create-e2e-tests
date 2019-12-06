// imports
import {Component, Container} from "@nascentdigital/wdio-extend";
import {Job} from "./Job";


// class definition
export class JobList extends Component {

    constructor(parent: Container) {
        super(parent, `*[data-component="JobList"]`);
    }

    public get job() {
        return new Job(this);
    }
}

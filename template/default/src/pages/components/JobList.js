// imports
const {Component} = require("@nascentdigital/e2e-wdio");
const {Job} = require("./Job");


// class definition
class JobList extends Component {

    constructor(parent) {
        super(parent, `*[data-component="JobList"]`);
    }

    get job() {
        return new Job(this);
    }
}


// exports
exports.JobList = JobList;

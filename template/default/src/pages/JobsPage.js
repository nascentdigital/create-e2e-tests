// imports
const {Page} = require("@nascentdigital/e2e-wdio");
const {JobList} = require("./components/JobList");


// page definition
class JobsPage extends Page {

    constructor() {
        super("/careers/opportunities");
    }

    get jobList() {
        return new JobList(this);
    }
}


// exports
exports.jobsPage = new JobsPage();

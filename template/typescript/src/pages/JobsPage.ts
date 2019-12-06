// imports
import {Page, PageParams} from "@nascentdigital/wdio-extend";
import {JobList} from "./components";


// page definition
class JobsPage extends Page {

    public constructor() {
        super("/careers/opportunities");
    }

    public get jobList() {
        return new JobList(this);
    }

    public open(query:PageParams  = {mock: true, job: "one"}) {
        super.open(query);
    }
}


// exports
export const jobsPage = new JobsPage();

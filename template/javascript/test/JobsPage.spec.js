// imports
const {expect} = require("chai");
const {Header, jobsPage} = require("../src/pages");


// tests
describe("Jobs Page", () => {

    // Header tests
    Header.test(jobsPage, "careersLink");

    // Job List tests
    describe("Job List Component", () => {

        it("should display empty state for 0 jobs", () => {

            // navigate to page
            jobsPage.open({mock: true, job: "none"});

            // wait until ready (should NOT display)
            jobsPage.jobList.job.waitUntilNotDisplayed();

            // verify
            expect(jobsPage.jobList.job.count()).to.be.eq(0);
        });

        it("should layout 1 job as per design", () => {

            // navigate to page
            jobsPage.open({mock: true, job: "one"});

            // wait until ready
            jobsPage.jobList.job.waitUntilDisplayed();

            // verify
            expect(jobsPage.jobList.isDisplayed()).to.be.true;
            expect(jobsPage.jobList.job.count()).to.be.eq(1);
        });

        it("should layout 4 jobs as per design", () => {

            // navigate to page
            jobsPage.open({mock: true, job: "few"});

            // wait until ready
            jobsPage.jobList.job.waitUntilDisplayed();

            // verify
            expect(jobsPage.jobList.isDisplayed()).to.be.true;
            expect(jobsPage.jobList.job.elements.length).to.be.eq(4);
        });
    });

    // Job tests
    describe("Job Component", () => {

        it("should layout title, caption, and button as per design", () => {

            // navigate to page
            jobsPage.open({mock: true, job: "one"});

            // wait until ready
            jobsPage.jobList.job.waitUntilDisplayed();

            // verify
            jobsPage.forEachBreakpoint(() => {

                // verify layout
                jobsPage.jobList.job.validateLayout();

                // verify styles
                jobsPage.jobList.job.title.validateStyle();
                jobsPage.jobList.job.caption.validateStyle();
            });
        });
    });
});

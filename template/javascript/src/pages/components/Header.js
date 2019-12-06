// imports
const {expect} = require("chai");
const {Component} = require("@nascentdigital/wdio-extend");
const {Menubar, MenubarLinkNames} = require("./Menubar");


// component definition
class Header extends Component {

    static test(page, activeLink) {

        // create header
        const header = new Header(page);

        // run tests
        header.test(activeLink);
    }

    constructor(page) {

        // call base constructor
        super(page, `header[data-component="Header"]`, "Header");

        // initialize instance variables
        this._page = page;
    }

    get staticMenubar() {
        return new Menubar(this, "StaticMenubar");
    }

    get floatingMenubar() {
        return new Menubar(this, "FloatingMenubar");
    }

    test(activeLink) {

        describe("Header", () => {

            it("should layout static header a top of page", () => {

                // navigate to page
                this._page.open();
                this.waitUntilDisplayed();

                // verify static header exists
                expect(this.staticMenubar.isDisplayed()).to.be.true;
                expect(this.floatingMenubar.isDisplayed()).to.be.false;

                // verify correct links are highlighted
                MenubarLinkNames.forEach(link => {

                    // ensure active link is active
                    if (link === activeLink) {
                        expect(this.staticMenubar[link].getClasses(), link)
                            .to.include("active");
                    }

                    // ensure other links are not active
                    else {
                        expect(this.staticMenubar[link].getClasses(), link)
                            .to.not.include("active");
                    }
                });
            });

            it("should layout floating header when scrolling up", () => {

                // navigate to page
                this._page.open();
                this.waitUntilDisplayed();

                // verify floating header isn't showing yet
                expect(this.floatingMenubar.isDisplayed()).to.be.false;

                // scroll back up (just enough to show floating header)
                browser.scrollTo(0, 400);
                expect(this.floatingMenubar.isDisplayed()).to.be.false;

                // verify floating is showing
                browser.scrollTo(0, 200);
                expect(this.floatingMenubar.isDisplayed()).to.be.true;

                // scroll top top (wait for fade out animation to complete)
                browser.scrollTo(0, 0);
                this.floatingMenubar.waitUntilNotDisplayed(1000);

                // verify static menubar is showing
                expect(this.staticMenubar.isDisplayed()).to.be.true;
            });
        });
    }
}


// exports
exports.Header = Header;

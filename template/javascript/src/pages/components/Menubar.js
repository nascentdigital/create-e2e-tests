// imports
const {Component, Layout} = require("@nascentdigital/wdio-extend");
const {MenubarLink} = require("./MenubarLink");


// constants
const MenubarLinkNames = ["processLink", "workLink", "careersLink"];


// class definition
class Menubar extends Component {

    constructor(parent, name) {
        super(parent, `*[data-component="${name}"]`, name);
    }


    get processLink() {
        return new MenubarLink(this, "processLink");
    }

    get workLink() {
        return new MenubarLink(this, "workLink");
    }

    get careersLink() {
        return new MenubarLink(this, "careersLink");
    }

    get button() {
        return new Component(this, `*[data-name="button"]`, "button");
    }

    declareLayout() {
        return Layout
            .xs()
            .sm()
                .layout(this.processLink).leftOf(this.workLink)
                .layout(this.workLink).leftOf(this.careersLink)
            .done();
    }
}


// exports
exports.MenubarLinkNames = MenubarLinkNames;
exports.Menubar = Menubar;

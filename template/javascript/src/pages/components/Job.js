// imports
const {Component, Layout} = require("@nascentdigital/wdio-extend");
const {BodyCopy, TitleSans} = require("../../styles");


// class definition
class Job extends Component {

    constructor(parent) {
        super(parent, `*[data-component="Job"]`);
    }


    get title() {
        return Component.create(this, `*[data-name="title"]`, "title")
            .withStyle(TitleSans);
    }

    get caption() {
        return Component.create(this, `*[data-name="caption"]`, "caption")
            .withStyle(BodyCopy);
    }

    get button() {
        return new Component(this, `*[data-name="button"]`, "button");
    }

    declareLayout() {
        return Layout
            .xs()
                .layout(this.title).above(this.caption)
                .layout(this.caption).above(this.button)
            .md()
                .layout(this.title).leftOf(this.caption)
                .layout(this.caption).leftOf(this.button)
            .done();
    }
}


// exports
exports.Job = Job;

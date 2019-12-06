// imports
const {Component} = require("@nascentdigital/wdio-extend");


// class definition
class MenubarLink extends Component {

    constructor(parent, name) {

        // call base constructor
        super(parent, `*[data-name="${name}"]`, name);
    }
}


// exports
exports.MenubarLink = MenubarLink;

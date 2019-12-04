// imports
const {Style} = require("@nascentdigital/wdio-extend");


// style definition
exports.TitleSans = Style
    .xs({
        "font-family": "Faktum, sans-serif",
        "font-size": "20px",
        "font-weight": 500,
        "font-style": "normal",
        "line-height": "30px",
        "letter-spacing": "normal",
        "color": "#000000"
    })
    .md({
        "font-family": "Faktum, sans-serif",
        "font-size": "26px",
        "font-weight": 500,
        "font-style": "normal",
        "line-height": "34px",
        "letter-spacing": "normal",
        "color": "#000000"
    })
    .done();

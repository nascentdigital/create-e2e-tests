exports.exportAll = function (targetModule, sourceModule) {
    for (const key in sourceModule) {
        if (!targetModule.exports.hasOwnProperty(key)) {
            targetModule.exports[key] = sourceModule[key];
        }
    }
};

/* jshint strict: false */
var stackTrace = require('stack-trace');

function getCaller(func) {
    return func.caller;
}

function getData(func) {
    return stackTrace.get(func || getCaller(getData));
}

function getString(func) {
    var callerData = getData(func || getCaller(getString));
    if (callerData.evalFlag) {
        return '(eval)' + callerData.functionName;
    } else {
        return callerData.functionName;
    }
}

function getDetailedString(func) {
    var callerData = getData(func || getCaller(getDetailedString));
    if (callerData.evalFlag) {
        return callerData.evalOrigin;
    } else {
        return callerData.functionName + ' at ' + callerData.filePath + ':' + callerData.lineNumber;
    }
}

module.exports = {
    getData: getData,
    getString: getString,
    getDetailedString: getDetailedString
};

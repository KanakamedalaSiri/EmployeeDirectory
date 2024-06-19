 var userReporter = {
    jasmineStarted: function(suiteInfo) {
        voltmx.print('Running suite with total specs ' + suiteInfo.totalSpecsDefined);
    },
    suiteStarted: function(result) {
        voltmx.print(' Test Suite: ' + result.description );
    },
    specStarted:function (result) {
        voltmx.print('Spec started: ' + result.description + ' whose full description is: ' + result.fullName);
    },
    specDone: function(result) {

        voltmx.print('Spec: ' + result.description + ' Execution status: ' + result.status + '');
        for(var i = 0; i < result.failedExpectations.length; i++) {
            voltmx.print('Failure: ' + result.failedExpectations[i].message);
                console.log(result.failedExpectations[i].stack);
        }

        voltmx.print(result.passedExpectations.length);
    },

    suiteDone: function(result) {
        voltmx.print('Suite: ' + result.description + ' was ' + result.status);
        for(var i = 0; i < result.failedExpectations.length; i++) {
            voltmx.print('AfterAll ' + result.failedExpectations[i].message);
                console.log(result.failedExpectations[i].stack);
        }
    },

    jasmineDone: function() {
        voltmx.print('Finished suite');
    }
};

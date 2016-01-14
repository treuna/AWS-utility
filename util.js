var Q = require("q");
var AWS = require('aws-sdk'); 

AWS.config.region = 'eu-central-1'; 
var ec2 = new AWS.EC2();

function get_instances() {
    var deferred = Q.defer();
    ec2.describeInstanceStatus(function(err, result) {
        if (err) {deferred.reject(err)}
        else {
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

function print_results(result) {
    for (var i = 0; i < result.InstanceStatuses.length; i++) {
        var instance = result.InstanceStatuses[i];

        if (process.argv.length < 3) {
            console.log('Instance Id: '+ instance.InstanceId +
            '\nInstance state: ' + instance.InstanceState.Name +
            '\nInstance status: ' + instance.InstanceStatus.Status +
            '\nSystem status: ' + instance.SystemStatus.Status + '\n');
            
        } else {
            if (instance.InstanceId == process.argv[2]) {
                console.log('Instance Id: ' + instance.InstanceId +
                '\nInstance state: ' + instance.InstanceState.Name +
                '\nInstance status: '+ instance.InstanceStatus.Status +
                ' ' + instance.InstanceStatus.Details[0].Name +
                ' ' + instance.InstanceStatus.Details[0].Status +
                '\nSystem status: '+ instance.SystemStatus.Status +
                ' ' + instance.SystemStatus.Details[0].Name +
                ' ' + instance.SystemStatus.Details[0].Status);
                if (instance.Events.length < 1) {
                    console.log('Events: No events\n');
                } else {
                    console.log('Events: ' + instance.Events[0].Code +
                    ' ' + instance.Events[0].Description + '\n');
                }
            }
        }
    }    
}

get_instances()
.then(print_results)
.catch(function(err) {
    console.log('An error occured:\n' + err);
})

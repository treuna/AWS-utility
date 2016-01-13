var Q = require("q");
var AWS = require('aws-sdk'); 

AWS.config.region = 'eu-central-1'; 
var ec2 = new AWS.EC2();

function get_instances() {
    var deferred = Q.defer()
    ec2.describeInstances(function(err, result) {
        if (err) {deferred.reject(err)}
        else {
            deferred.resolve(result)
        }
    });
    return deferred.promise;
}

function print_results(result) {
    for (var i = 0; i < result.Reservations.length; i++) {
        var reservations = result.Reservations[i];
        var instances = reservations.Instances;

        for (var j = 0; j < instances.length; j++) {

            if (process.argv.length < 3) {
                console.log('Name: '+instances[j].KeyName+'\nState: '
                + instances[j].State.Name +'\n');
                
            } else {
                if (instances[j].KeyName == process.argv[2]) {
                    console.log('Name: ' + instances[j].KeyName +
                    '\nState: ' + instances[j].State.Name +
                    '\nInstance ID: ' + instances[j].InstanceId +
                    '\nImage ID: ' + instances[j].ImageId +
                    '\nPublic ip: ' + instances[j].PublicIpAddress +
                    '\nLaunch time: ' + instances[j].LaunchTime +'\n');
                }
            }
        }
    }    
}

get_instances()
.then(print_results)
.catch(function(err) {
    console.log('Oh noes!\n' + err);
})

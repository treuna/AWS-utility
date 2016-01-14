Small Node.js tool for checking AWS EC2 instances.

INSTALLATION To install required node modules run "npm install --save".
This software requires proper credentials in the .aws folder to function.

USAGE "node util.js" lists all the EC2 instances related to the AWS account. 
From each instance the state and the statuses are shown.

:~/aws$ node util.js
Instance Id: i-eXXXXXXX
Instance state: running
Instance status: ok
System status: ok

"node util.js example_instanceid" displays detailed information about the
instance. This prints out more details about the statuses and also it shows any
planned events.

:~/aws$ node util.js i-eXXXXXXX 
Instance Id: i-e51aa259
Instance state: running
Instance status: ok reachability passed
System status: ok reachability passed
Events: No events
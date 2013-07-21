docker.io
=========

Node.JS wrapper for low-level Docker.io HTTP interface

[![Build Status](https://travis-ci.org/nisaacson/docker.io.png)](https://travis-ci.org/nisaacson/docker.io)

## Usage

```javascript

var docker = require('docker.js')({host:"http://localhost", port: "4243", version:'v1.1'});

// Note, the options for host, port and version are all optional. The values passed
// in this example are the defaults

```

We have implamented most of the container methods like:

- list

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.list(options, handler);
// OR
docker.containers.list(handler);

```

- create

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.create(options, handler);
// OR
docker.containers.create(handler);

```

- inspect

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.inspect('263tbr762t37rtbd', options, handler);
// OR
docker.containers.inspect('263tbr762t37rtbd', handler);


```

- inspectChanges

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.inspectChanges('263tbr762t37rtbd', options, handler);
// OR
docker.containers.inspectChanges('263tbr762t37rtbd', handler);

```

- runExport

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.runExport('263tbr762t37rtbd', options, handler);
// OR
docker.containers.runExport('263tbr762t37rtbd', handler);
```

- start

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.start('263tbr762t37rtbd', options, handler);
// OR
docker.containers.start('263tbr762t37rtbd', handler);
```

- stop

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.stop('263tbr762t37rtbd', options, handler);
// OR
docker.containers.stop('263tbr762t37rtbd', handler);
```

- restart

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.restart('263tbr762t37rtbd', options, handler);
// OR
docker.containers.restart('263tbr762t37rtbd', handler);
```

- attach

```javascript

// This gets fired on every line returned by the container for stderr, stdin, & stdout. It gets called once for logs
function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.attach('263tbr762t37rtbd', options, handler);
// OR
docker.containers.attach('263tbr762t37rtbd', handler);
```

- wait

```javascript

// This fires once the container stops
function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.wait('263tbr762t37rtbd', options, handler);
// OR
docker.containers.wait('263tbr762t37rtbd', handler);
```

- runExport

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

var options = {}; // all options listed in the REST documentation for Docker are supported.

docker.containers.runExport('263tbr762t37rtbd', options, handler);
// OR
docker.containers.runExport('263tbr762t37rtbd', handler);
```

- version

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

docker.version(handler);
```

- info

```javascript

function handler(err, res) {
    if (err) throw err;
    console.log("data returned from Docker as JS object: ", res);
}

docker.info(handler);
```


Other methods are implamented but a little buggy... PULL REQUESTS ARE WELCOME!

# Tests

To run the test suite you will need the following

* the docker daemon installed and running
* a long running process inside a ubuntu container

To simplify testing you can use the included Vagrantfile to setup a testing environment. To start the VM you will need [vagrant](https://vagrantup.com) installed on your machine


```bash
vagrant up
vagrant ssh
# start a long running process using the Ubuntu container in detached mode
docker run -d ubuntu tail -f /var/log/boot
# cd to the project root directory which is mounted on the VM at /vagrant
cd /vagrant
# install the development dependencies
npm install
npm test
```

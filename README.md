docker.io
=========

Node.JS wrapper for low-level Docker.io HTTP interface

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


Other methods are implemented but a little buggy... PULL REQUESTS ARE WELCOME!

# Images

So far the `list` and `create` methods are supported for images.

 - list

```javascript
function handler(err, images) {
  if (err) {
    throw err
  }
  console.log("images data returned from Docker as JS object: ", images);
}
var opts = {}
docker.images.list(opts, handler)
```

The `images` object in the example above should look something like the following assuming that the `ubuntu` image is installed

```javascript
[
  {
    Repository: 'ubuntu',
    Tag: '12.04',
    Id: '8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c',
    Created: 1365714795,
    Size: 131502179,
    VirtualSize: 131502179
  },
  {
    Repository: 'ubuntu',
    Tag: '12.10',
    Id: 'b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc',
    Created: 1364102658,
    Size: 24653,
    VirtualSize: 180116135
  },
  {
    Repository: 'ubuntu',
    Tag: 'latest',
    Id: '8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c',
    Created: 1365714795,
    Size: 131502179,
    VirtualSize: 131502179
  }
  // maybe more images here
]
```
 - create

Currently the module on supports creating an image by pulling down from the public docker repository. Since the creation happens over several steps, the
Docker api sends back streaming results. You can optionally pass in a second final callback which is called when Docker completes the image creation

```javascript

// incrementally log the streaming response from the docker api.
// This function will most likely be called more than once
function streamingResponseHandler(err, images) {
  if (err) {
    throw err
  }
  console.log("images data returned from Docker as JS object: ", images);
}

// only called after the image creation is complete
function completeHandler(err) {
  if (err) {
    throw err
  }
  console.log('image created successfully')
}

var opts = {
  fromImage: 'ubuntu' // the fromImage field is a required option here
}
// note that unlike other examples we pass 2 callbacks here
docker.images.create(opts, streamingResponseHandler, completeHandler)
```


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

var docker = require('./lib')({
  host: 'http://localhost',
  version: '1.3'
});
var expect = require('chai').expect;
var someContainerID = '';

describe("docker.io", function() {

  describe("#containers", function() {

    describe("#list", function() {

      it("should list all active containers", function(done) {
        this.timeout(50000);

        function handler(err, res) {
          expect(err).to.be.null;

          if (res.length > 0) {
            someContainerID = res[0].Id;
          } else {
            console.log('Tests are about to fail because there are no running containers... start a long running container in order to pass all tests... this container should be a ubuntu container...');
          }
          done();
        }

        docker.containers.list({}, handler);
      });
    });

    describe("#create", function() {

      it("should create a new container", function(done) {
        this.timeout(50000);

        function handler(err, res) {
          expect(err).to.be.null;

          done();
        }

        docker.containers.create({
          Image: 'ubuntu',
          Cmd: ["date"]
        }, handler);
      });
    });

    describe("#attach", function() {

      it("should attach to a container", function(done) {
        this.timeout(50000);

        function handler(err, res) {
          expect(err).to.be.null;
          done();
        }

        docker.containers.attach(someContainerID, {
          stream: true,
          stdout: true
        }, handler);
      });
    });

    describe("#inspect", function() {

      it("should inspect a container", function(done) {
        this.timeout(50000);

        function handler(err, res) {
          expect(err).to.be.null;

          done();
        }

        docker.containers.inspect(someContainerID, handler);
      });
    });

    describe("#inspectChanges", function() {

      it("should inspect changes in a container", function(done) {
        this.timeout(50000);

        function handler(err, res) {
          expect(err).to.be.null;

          done();
        }

        docker.containers.inspectChanges(someContainerID, handler);
      });
    });

    describe("#stop", function() {

      it("should stop a running container", function(done) {
        this.timeout(5000000);

        function handler(err, res) {
          expect(err).to.be.null;

          done();
        }

        docker.containers.stop(someContainerID, handler);
      });
    });

    describe("#start", function() {

      it("should start a container", function(done) {
        this.timeout(5000000);

        function handler(err, res) {
          expect(err).to.be.null;

          done();
        }

        docker.containers.start(someContainerID, handler);
      });
    });

    describe("#restart", function() {

      it("should restart a running container", function(done) {
        this.timeout(5000000);

        function handler(err, res) {
          expect(err).to.be.null;

          done();
        }

        docker.containers.restart(someContainerID, handler);
      });
    });

    describe("#attach", function() {

      it("should attach to a container and return a data stream", function(done) {
        this.timeout(50000);

        function handler(err, res) {
          console.log('This function is not yet supported as we don\'t manage streaming results');
          //expect(err).to.be.null;

          done();
        }

        docker.containers.attach(someContainerID, handler);
      });
    });

    describe("#kill", function() {

      it("should kill a container", function(done) {
        this.timeout(5000000);

        function handler(err, res) {
          expect(err).to.be.null;

          done();
        }

        docker.containers.kill(someContainerID, handler);
      });
    });

    describe("#remove", function() {

      it("should remove a container", function(done) {
        this.timeout(50000);

        function handler(err, res) {
          expect(err).to.be.null;

          done();
        }

        docker.containers.remove(someContainerID, handler);
      });
    });

  });

  describe("#images", function() {

    describe("#list", function() {

      it("should list all images", function(done) {
        this.timeout(50000);

        function handler(err, res) {
          expect(err).to.be.null;
          if (res.length === 0) {
            console.log('Tests are about to fail because there are no images... pull the "ubuntu" image first to pass all tests... this container should be a ubuntu container...');
          }
          expect(res.length).to.be.above(0, 'no images found')
          done();
        }

        docker.images.list({}, handler);
      });
    });

    describe("#create", function() {

      it("should create an image by pulling from remote repository", function(done) {
        this.timeout('50s');
        this.slow('5s')
        var pullingResponseReceived = false
        var image = 'base'
        var pullingPattern = new RegExp('Pulling repository ' + image)
        function handler(err, res) {
          expect(err).to.be.null;
          if (res && res.status) {
            if (pullingPattern.test(res.status)) {
              pullingResponseReceived = true
            }
          }
        }

        function finalCB() {
          expect(pullingResponseReceived).to.be.true
          done()
        }
        docker.images.create({
          fromImage: image
        }, handler, finalCB);
      });

      it("should return error when trying to create/pull an image that does not exist", function(done) {
        this.timeout(50000);
        this.slow('2s')
        function handler(err, res) {
          if (err) {
            return done()
          }
        }

        function finalCB() {
          expect(false)
        }
        docker.images.create({
          fromImage: 'nonExistantImage'
        }, handler, finalCB);
      });

    });

  })

  describe("#runExport", function() {

    it("should export a container", function(done) {
      this.timeout(50000);

      function handler(err, res) {
        expect(err).to.be.null;

        done();
      }

      docker.containers.runExport(someContainerID, handler);
    });
  });

  describe("#info", function() {
    it("should show all docker info", function(done) {
      this.timeout(50000);

      function handler(err, res) {
        expect(err).to.be.null;

        done();
      }

      docker.info(handler);
    });
  });

  describe("#version", function() {
    it("should show all docker version", function(done) {
      this.timeout(50000);

      function handler(err, res) {
        expect(err).to.be.null;

        done();
      }

      docker.version(handler);
    });
  });

  describe("#getAuth", function() {
    it("should show all docker version", function(done) {
      this.timeout(50000);

      function handler(err, res) {
        expect(err).to.be.null;

        done();
      }

      docker.getAuth(handler);
    });
  });
});

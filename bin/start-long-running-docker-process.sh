# tail a default file so that the docker.io test suite has a container to test against
docker run -d ubuntu tail -f /var/log/boot

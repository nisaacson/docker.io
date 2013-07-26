sudo apt-get install -qq software-properties-common
sudo add-apt-repository -y ppa:dotcloud/lxc-docker
sudo apt-get update
sudo apt-get install -qq linux-image-generic-lts-raring
# sudo apt-get install -qq linux-image-extra-virtual
sudo apt-get install -qq lxc-docker

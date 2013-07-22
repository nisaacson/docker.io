sudo apt-get install -qq software-properties-common
sudo add-apt-repository -y ppa:dotcloud/lxc-docker
sudo apt-get update
sudo apt-get install -qq linux-image-extra-`uname -r`
sudo apt-get install -qq lxc-docker

#~/bin/bash
sudo apt update
# install requirements
sudo apt install -y python3 python3-pip python3-venv
#create virtual environment
python3 -m venv env 
#export path
echo "export PATH="~/.local/bin:$PATH"" >> ~/.bashrc
# Activate the environment and install requirements.txt 
source env/bin/activate 
python3 -m pip install -r requirements.txt 

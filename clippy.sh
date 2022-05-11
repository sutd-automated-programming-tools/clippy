#!/bin/sh
pip install jupyter
git clone https://github.com/ipython-contrib/jupyter_contrib_nbextensions.git
pip install -e  pip install -e jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
jupyter nbextension install clippy2 --user
jupyter nbextension enable clippy2/main --user

echo 'install python3.9.12'
pyenv install 3.9.12
echo 'set up environment'
pyenv local 3.9.12
python -m pip install pipenv
python -m pipenv shell 
[Jupyter frontend documentation](https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html)

RUN
======
1. Download clippy and run the following scripts to run locally:
```
git clone https://github.com/sutd-automated-programming-tools/clippy.git
. install_pyenv.sh
. install_python.sh
. clippy.sh
```


2. Build local image and run container (container does not need to be restarted on script edit)
```
docker build . -t clippy-voca
docker compose up
```

3. Open `http://localhost:8888` or click the link for the notebook from the terminal
4. Open a jupyter notebook, clippy should appear at the left side of the notebook navigation bar

*To change the options of functions in dropdown change the functions.json file in the `clippy` folder **or** insert a new file in the `clippy` folder and change the path of the file under `clippy/main.js`*

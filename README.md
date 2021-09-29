[Jupyter frontend documentation](https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html)

To run:

1. Build into `clippy` folder (you can also use a watcher to auto build on edit)
```
npm run build
```

2. Build local image and run container (container does not need to be restarted on script edit)
```
docker build . -t clippy-voca
docker-compose up
```

3. Open `http://localhost:8888`
4. Check that `ClippyAssist` appears in the `Nbextensions` tab
5. Open a jupyter notebook, clippy should appear at the side

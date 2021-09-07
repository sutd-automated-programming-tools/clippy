FROM jupyter/minimal-notebook

#RUN sudo apt update && upgrade -y
#RUN apt install cowsay -y
#COPY clippy /clippy

RUN pip install jupyter_nbextensions_configurator
RUN jupyter nbextensions_configurator enable
USER root
RUN jupyter nbextension install /clippy --symlink
RUN jupyter nbextension enable clippy/main 

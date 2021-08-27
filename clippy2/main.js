const loginUrl='http://127.0.0.1/clara/login'
let data={"username": "ismam",
"password": "barelypass"}
let loginFormData = new FormData();
loginFormData.append("username", "ismam");
loginFormData.append("password", "barelypass")
let params={
    body:loginFormData,
    method:'POST'
}


define(['base/js/namespace'], function (Jupyter) {

  async function load_ipython_extension() {

    Jupyter.notebook.config.loaded.then(alert('initialize'));
    let res = await fetch(url,params)
    res = await res.json()
    console.log(res)
    await alert(res)
  }

  return {
    load_ipython_extension: load_ipython_extension
  };
});

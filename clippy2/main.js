// disabled login
// const loginUrl = 'http://127.0.0.1/clara/login'
// let data = {
//   "username": "ismam",
//   "password": "barelypass"
// }
// let loginFormData = new FormData();
// loginFormData.append("username", "ismam");
// loginFormData.append("password", "barelypass")
// let loginParams = {
//   body: loginFormData,
//   method: 'POST'
// }


define(['base/js/namespace'], function (Jupyter) {

  async function load_ipython_extension() {

    try {
      //disabled login
      // let res = await fetch(loginUrl, loginParams)
      // res = await res.json()

      //create add select element to the toolbar
      select = document.createElement('select')
      select.setAttribute('id', 'select')
      select.style.setProperty("margin-left", "0.75em")
      select.setAttribute("class", "form-control select-xs")
      Jupyter.toolbar.element.append(select);

      //create submit button and add to toolbar, get value from select and make http request and then add cell for the result


      //load data
      response = await fetch(Jupyter.notebook.base_url + "nbextensions/clippy2/functions.json")
      json = await response.json()

      //create option and add data
      json['functions'].forEach(element => {
        console.log(element['entryfnc'])

        //create function option and add it to select tag in toolbaar
        option = document.createElement('option')
        name = element['entryfnc']
        option.setAttribute('id', name)
        text = document.createTextNode(name)
        option.append(text)
        option.setAttribute('submission_folder', element['submission_folder'])
        option.setAttribute('args', element['args'])

        select.append(option)
      });
    }
    catch (e) {
      console.log(e)
    }
  }

  return {
    load_ipython_extension: load_ipython_extension
  };
});

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


async function getFeedback(entryfnc, code, submission_folder, args) {
  const url = 'http://127.0.0.1/clara/feedback_snippet'
  // const url = 'http://18.141.189.44/clara/feedback_snippet'
  let data = {
    "submission_folder": submission_folder,
    "entryfnc": entryfnc,
    "args": args,
    "code": code
  }
  let params = {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    method: 'PUT'
  }
  //add code to data
  let res = await fetch(url, params)
  res = await res.json()
  return res
  //can encapsulate with a try  catch block but the calling function already has one
}
function createSelect() {
  select = document.createElement('select')
  select.setAttribute('id', 'select')
  select.style.setProperty("margin-left", "0.75em")
  select.setAttribute("class", "form-control select-xs")
  Jupyter.toolbar.element.append(select);
  return select
}
function handleRequestFeedback(feedback, error) {
  if (error != undefined)
    alert("error: \n" + error)
  else {
    new_cell = Jupyter.notebook.insert_cell_below('raw')
    new_cell.set_text("Feedback\n\n\n" + feedback)
    new_cell.focus_cell();
    Jupyter.notebook.execute_cell()
  }
}
function checkFunctionName(name) {
  re = new RegExp('def +' + name)
  if (re.test(code))
    return true
  else
    return false

}
function createButton() {
  button = document.createElement('button')
  button.setAttribute('id', 'button')
  button.innerHTML = 'Get Help!'
  button.onclick = async () => {
    //get data from cell
    code = Jupyter.notebook.get_selected_cell().get_text()
    cells = Jupyter.notebook.get_cells()
    // console.log(cells)
    s = ''
    cells.forEach(cell => {
      if (cell.cell_type == 'code')
        s += cell.get_text() + '\n'
    })
    //get data from select and send http request
    option = document.getElementById(select.value)
    if (checkFunctionName(option.id)) {
      let feedback, error
      await getFeedback(option.id, s, option.getAttribute("submission_folder"), option.getAttribute("args"))
        .then(res => feedback = res)
        .catch(e => error = e)
      //add feedback/error to cell below
      handleRequestFeedback(feedback, error)
    }
    else
      alert('code cell does not have function name.')
  }
  Jupyter.toolbar.element.append(button)
}
async function loadJson() {
  //be mindful of the path 
  response = await fetch(Jupyter.notebook.base_url + "nbextensions/clippy2/functions.json")
  return await response.json()
}
function addOptions(json) {
  json['functions'].forEach(element => {

    //create function option and add it to select tag in toolbaar
    option = document.createElement('option')
    name = element['entryfnc']
    option.setAttribute('id', name)
    text = document.createTextNode(name)
    option.append(text)
    option.setAttribute('submission_folder', element['submission_folder'])
    option.setAttribute('args', element['args'])
    // use getFeedback and set the anonymous function return to a custom option property

    select.append(option)
  });
}
define(['base/js/namespace'], function (Jupyter) {

  async function load_ipython_extension() {

    try {
      //disabled login
      // let res = await fetch(loginUrl, loginParams)
      // res = await res.json()

      //create add select element to the toolbar
      select = createSelect()

      //create submit button and add to toolbar, get value from select and make http request and then add cell for the result
      createButton()

      //load data
      json = await loadJson()

      //create option and add data
      addOptions(json)
    }
    catch (e) {
      console.log(e)
    }
  }

  return {
    load_ipython_extension: load_ipython_extension
  };
});

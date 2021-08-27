//list all methods defined in property chain

// const getMethods = (obj) => {
//     let properties = new Set()
//     let currentObj = obj
//     do {
//       Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
//     } while ((currentObj = Object.getPrototypeOf(currentObj)))
//     return [...properties.keys()].filter(item => typeof obj[item] === 'function')
//   }

//   //gets property of Jupyter.notebook
//   getMethods(Jupyter.notebook)
console.log('moshi moshi')

// clara login with fetch code

let url='http://127.0.0.1/clara/login'
let data={"username": "ismam",
"password": "barelypass"}
let formData = new FormData();
formData.append("username", "ismam");
formData.append("password", "barelypass")
let params={
    body:formData,
    method:'POST'
}


let feedUrl='http://127.0.0.1/clara/feedback_snippet'
let feedData= {
  "submission_folder": "sub_code/year/category/Qn",
  "entryfnc": "computeDeriv",
  "args": "[[[4.5]],[[1.0,3.0,5.5]]]",
  "code": "print(\"hello clara!\")"
}


async function getResponse() {
  let res = await fetch(url,params)
  res = await res.json()
  params={
        headers:{
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+res["access_token"]
        },
        body:JSON.stringify(feedData),
        method:'PUT'
  }
  console.log(params)
  res = await fetch(feedUrl,params )
  res = await res.json()
  return res
}
params

getResponse().then(console.log).catch()


// let token;
// let response;
// fetch(url,params)
//   .then(d => d.json())
//   .then(v => {
//       params = {
//         headers:{
//           'Content-Type': 'application/json',
//           'Authorization':'Bearer '+v["access_token"]
//         },
//         body:JSON.stringify(feedData),
//         method:'PUT'
//       }
//       return fetch(feedUrl,params)
//   })
//   .then(d => d.json())
//   .then(v => response=v)

// setTimeout(() => console.log(response), 1000)




// html elements with js code

div=document.getElementById('div')
form=document.createElement('form')
form.setAttribute('id','form')
select=document.createElement('select')
select.setAttribute('id','select')
select.style.setProperty("margin-left", "0.75em")
select.setAttribute("class", "form-control select-xs")
select.setAttribute('onchange',function(){})
option=document.createElement('option')
option.setAttribute('id','option')
text=document.createTextNode('option')
option.append(text)
select.append(option)
form.append(select)
div.append(form)
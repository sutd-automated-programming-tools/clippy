// A jsx pragma method to create html dom elements (more info below)
// function createElement(tagName, attrs = {}, ...children) {
//     const elem = Object.assign(document.createElement(tagName), attrs)
//     for (const child of children) {
//         if (Array.isArray(child)) elem.append(...child)
//         else elem.append(child)
//     }
//     return elem
// }

define([
    'base/js/namespace',
], function(Jupyter) {
    // Adds a cell above current cell (will be top if no cells)
    var add_cell = function() {
        Jupyter.notebook.
        insert_cell_above('code').
            // Define default cell here
            set_text(``);
        Jupyter.notebook.select_prev();
        Jupyter.notebook.execute_cell_and_select_below();
    };
    // Button to add default cell
    var defaultCellButton = function () {
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register ({
                'help': 'Add default cell',
                'icon' : 'fa-play-circle',
                'handler': add_cell
            }, 'add-default-cell', 'Default cell')
        ])
    }


    function extract_cell_data() {
        let cell = Jupyter.notebook.get_selected_cell();
        alert(cell.get_text());
        
        //ismam's code
        const url='http://127.0.0.1/clara/feedback_snippet'
        const data={"username": "ismam",
        "password": "barelypass"}
        const params={
            headers:{
                'Content-Type': 'application/json'
            },
            body:data,
            method:'POST'
        }
        fetch(url,params).then(data =>console.log(data)).catch(error =>console.error(error))

        //end
    }
    const Clippy = (
        <div className="root"
        >
            <div className="chatbox">
                Hello! Do you need help with your code?
                <button id="help_btn">Help me</button>
            </div>
            <img src="/nbextensions/clippy/clippy.png" alt="clippy"/>
            <style jsx>{
                `
                  .root {
                    position: fixed;
                    bottom: 50vh;
                    right: 0;
                    width: 10vw;
                    height: auto;
                    z-index: 100;
                  }

                  .root img {
                    width: 10vw;
                    height: auto;
                  }

                  .root div.chatbox {
                    position: relative;
                    height: auto;
                    width: 10vw;
                    padding: 5px;
                    background-color: #f8f88d;
                  }
                `
            }
            </style>
        </div>
    )

    // Run on start
    function load_ipython_extension() {
        // Add a default cell if there are no cells
        // if (Jupyter.notebook.get_cells().length===1){
        //     add_cell();
        // }
        // defaultCellButton();
        document.getElementById("notebook").prepend(Clippy)
        document.getElementById("help_btn").addEventListener("click", extract_cell_data);
    }
    return {
        load_ipython_extension: load_ipython_extension
    };
});
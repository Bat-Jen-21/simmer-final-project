// Create some responsive javascript for my website

// Can i use the .length to avoid using a const steps
var instruct_steps = 0
var ingredients_steps = 0
var instructions = []
var ingredients = []

function enter(event){
    if ((event.key === "Enter") && (event.srcElement.matches(".create-ins"))){
        nextItem(event)
    } 
}

function remove(event){
    x = document.getElementById(event.srcElement.dataset.assosiatedElement);
    var remove_index = instructions.indexOf(x.id);
    console.log(instructions[remove_index])

    // Remove the element from end of the list and the document object
    console.log(x)
    x.remove()
    // Pop from the list
    // instructions.pop()
    //steps = instructions.length + 1;
}

// Create a clone of the javascript creating and removing elents so they can be used in a genral setting

function nextItem(event){
    let idNumber = 0
    let value = ""
    let which = document.getElementById(event.srcElement.dataset.assosiatedElement);
    //ClientSide check for blank input by selecting all input elements and checking for blanks
    let ins = which.querySelectorAll("input, textarea, select")
    for (let i of ins){
        if (i.value.trim() ==="" || i.value.trim() == "Placeholder"){
            alert("Box cannot be blank");
            return;
        }
    }

    // clone the template node
    var newStep = document.getElementById("item_template").content.cloneNode(true);

    // Iterate through the nodes content and apply that to the template
    let parts = which.querySelectorAll(".create-ins")
    //console.log(parts);

    // Add the text to the function
    let text = newStep.querySelector("li");
    let newText = ""; 

    if (which.getAttribute("name") === "ingredients"){
        // Check the value is an int
        if ((isNaN(ins[1].value))){
            alert("Amount must be a number");
            return; 
        }
        for (item in ins){
            value += item.value + ",##7585"
        }
        newText = String(ins[1].value) + " " + String(ins[2].value).toLowerCase() + " of "  + String(ins[0].value)  
        ingredients_steps += 1;
        idNumber = ingredients_steps
        console.log(ins.values())
    }
    else {
        newText = String(ins[0].value)
        value = newText
    }
  
    instruct_steps += 1;
    idNumber = instruct_steps

    // Apply the text
    let txt = newStep.querySelector("p");
    txt.innerHTML = newText;
    
    // Add morqe attributes
    let container = newStep.querySelector("li");
    let button = newStep.querySelector("button");
    //button.dataset.assosiatedElement = container.id;

    // Add the hiddent elements to the form
    let hidden = newStep.querySelector("input")
    hidden.name = which.getAttribute("name") + idNumber
    hidden.className = "list-submit-item"
    hidden.value = value

    //console.log(which)

    document.getElementById(which.getAttribute("data-assosiated-list")).appendChild(newStep);
    
    return

}

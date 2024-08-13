// Create some responsive javascript for my website

// Can i use the .length to avoid using a const steps
var steps = 1
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
    instructions.pop()
    //steps = instructions.length + 1;
}

// Create a clone of the javascript creating and removing elents so they can be used in a genral setting

function nextItem(event){
    let which = document.getElementById(event.srcElement.dataset.assosiatedElement);
    console.log(event.srcElement)
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
        newText = String(ins[1].value) + " " + String(ins[2].value).toLowerCase() + " of "  + String(ins[0].value)
    }
    else newText = String(ins[0].value)

    // Apply the text
    let txt = newStep.querySelector("p");
    txt.innerHTML = newText;
    
    // Add morqe attributes
    let container = newStep.querySelector("li");
    let button = newStep.querySelector("button");
    //button.dataset.assosiatedElement = container.id;
    document.getElementById(which.getAttribute("data-assosiated-list")).appendChild(newStep);
    
    return
    
    // Create and insert in the previous instruction as a paragraph
    // Get access to child nodes
    
    
    var h = newStep.querySelector("label")

    //Add information to child nodes
    h.innerHTML = "Step " + steps + ": ";
    text.innerHTML = document.getElementById("instruct_txt").value;
    text.name = "I" + steps;
    container.id = "I" + steps;
    instructions.push(container.id)
    button.dataset.assosiatedElement = container.id;
    
    document.getElementById("instruct_txt").value = "";

}

// Create some responsive javascript for my website

// Can i use the .length to avoid using a const steps
var steps = 1
var instructions = []
var ingredients = []

function nextInstruct(event){
    
    //ClientSide check for blank input
    if (document.getElementById("instruct_txt").value.trim() === ""){
        alert("Instruction box cannot be blank")
    }

    else{
        // Create and insert in the previous instruction as a paragraph
        // Get access to child nodes
        var newStep = document.getElementById("item_template").content.cloneNode(true);
        var container = newStep.querySelector("li");
        var button = newStep.querySelector("button")
        var text = newStep.querySelector("p");
        //var h = newStep.querySelector("label")

        //Add information to child nodes
        //h.innerHTML = "Step " + steps + ": ";
        text.innerHTML = document.getElementById("instruct_txt").value;
        text.name = "I" + steps;
        container.id = "I" + (instructions.length + 1);
        instructions.push(container.id)
        button.dataset.assosiatedElement = container.id;
        document.getElementById("instruct_list").appendChild(newStep);
        document.getElementById("instruct_txt").value = "";
        steps++; 
    }
    

}

function enter(event){
    if ((event.key === "Enter") && (event.srcElement.id === "instruct_txt")){
        nextInstruct(event)
    } 
}

function remove(event){
    x = document.getElementById(event.srcElement.dataset.assosiatedElement);
    var remove_index = instructions.indexOf(x.id);

    
    for (let i = remove_index; i < instructions.length - 1; i++){
        //Get the next object
        let a = document.getElementById(instructions[i]).querySelector("li")
        let b = document.getElementById(instructions[i + 1]).querySelector("li")
        // swap the text data for each element
        a.innerHTML = b.innerHTML;
    }
    // Remove the element from end of the list and the document object
    document.getElementById(instructions[instructions.length - 1]).remove()
    // Pop from the list
    instructions.pop()
    steps = instructions.length + 1;
}

function removeNew(event){
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
    console.log(which.id + "ID")

    let txt = newStep.querySelector("p");
    text.innerHTML = newText;
    
    // Add more attributes

    let container = newStep.querySelector("li");
    let button = newStep.querySelector("button")
    document.getElementById(which.getAttribute("data-assosiated-list")).appendChild(newStep);
    button.dataset.assosiatedElement = container.id;
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

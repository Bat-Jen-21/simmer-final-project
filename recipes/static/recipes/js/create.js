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
    let toRemove = document.getElementById(event.srcElement.dataset.assosiatedElement);
    toRemove.remove()
}

// Create a clone of the javascript creating and removing elents so they can be used in a genral setting

function nextItem(event = "x", gen = "x", gen_values = "" ){
    let ins = []
    let value = ""
    let newText = []; 

    if (gen === "x"){
        var which = document.getElementById(event.srcElement.dataset.assosiatedElement);
    }
    else{
        var which = document.getElementById(gen);
    }

    let targetName = which.getAttribute("name")

    if (gen === "x"){
        let insOb = which.querySelectorAll("input, textarea, select");
        for (i of insOb){
            ins.push(i.value)
        }
        for (let i of ins){
            if (i.trim() ==="" || i.trim() == "Placeholder"){
                alert("Box cannot be blank");
                return;
            }
    }

        if (targetName === "ingredients"){
            // Check the value is an int
            if ((isNaN(ins[1]))){
                alert("Amount must be a number");
                return; 
            }
            newText = String(ins[1]) + " " + String(ins[2]).toLowerCase() + " of "  + String(ins[0]) 
        }
        else {
            newText = String(ins[0])
        }
    }
    else {
        newText = gen_values;
    }
    
    var newStep = document.getElementById("item_template").content.cloneNode(true);

    // Apply the text
    let txt = newStep.querySelector("p");
    txt.innerHTML = newText;
    inp = newStep.querySelector("input");
    inp.value = newText;
    inp.name = "list-element:" + targetName;
    document.getElementById(which.getAttribute("data-assosiated-list")).appendChild(newStep);

    // Clear the input forms for the targeted region
    let parts = which.querySelectorAll(".create-ins");

    for (let part of parts){
        part.value = "";
    }
    return
}

window.onload = function(){
    if (formDataJson === null){
        return
    }
    else{
        generateList()
    }
}

// It's generating the list even after I delete Items
function generateList(){
    if (formDataJson["instructions"]){
        for (let i of formDataJson["instructions"]){
            nextItem("x","instruct-form",i)
        }
    }
    if (formDataJson["ingredients"][0]){
        for (let i of formDataJson["ingredients"]){
            nextItem("x", "ingredient-form",i )
        }
    }
    console.log(blank)
    if (blank == "1"){
        alert("No form input can be blank upon submission")
    }
}

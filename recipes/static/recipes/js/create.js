let instruct_steps = 0
let ingredients_steps = 0
let instructions = []
let ingredients = []


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
    let newText = ""; 
    let hiddenValue = []

    if (gen === "x"){
        var which = document.getElementById(event.srcElement.dataset.assosiatedElement);
    }
    else{
        var which = document.getElementById(gen);
    }

    let targetName = which.getAttribute("name")
    if (gen === "x"){
        let insOb = which.querySelectorAll("input:not([type='hidden']), textarea, select");
        for (let i of insOb){
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
            newText = makeIngredients(ins)
            for (let i of ins){
                hiddenValue.push(i.toLowerCase());
            }}
        else {
            newText = String(ins[0])
        }
    }
    else {
        if (targetName === "ingredients"){
            newText = makeIngredients(JSON.parse(gen_values))
            console.log(newText + "modified")
        }
        else{
            newText = gen_values;
        }
    }

    var newStep = document.getElementById("item_template").content.cloneNode(true);

    // Apply the text
    let txt = newStep.querySelector("p");
    console.log(newText)
    txt.innerHTML = newText;
    inp = newStep.querySelector("input");
    inp.name = "list-element:" + targetName;
    if (hiddenValue.length > 0){
        inp.value = JSON.stringify(hiddenValue)
    }
    else{
        inp.value = newText
    }

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
    if (formDataJson["ingredients"]){
        for (let i of formDataJson["ingredients"]){
            nextItem("x", "ingredient-form",i )
        }
    }

    if (blank == "1"){
        alert("No form input can be blank upon submission")
    }
}

function makeIngredients(ingredients){
    return (String(ingredients[1]) + " " + String(ingredients[2]).toLowerCase() + " of "  + String(ingredients[0]).toLowerCase())
}

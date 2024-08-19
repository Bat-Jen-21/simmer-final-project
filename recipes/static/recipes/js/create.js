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
    let value = toRemove.querySelector("p").innerHTML;
    document.getElementsById(toRemove.dataset.assosiatedList).value.search(/value/)
}

// Create a clone of the javascript creating and removing elents so they can be used in a genral setting


//This whole function is trash and should be destroyed
function nextItem(event = "x", gen = "x", gen_values = "" ){
    let ins = []
    var which
    let value = ""
    if (gen === "x"){
        which = document.getElementById(event.srcElement.dataset.assosiatedElement);
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
    }
    else {
        which = document.getElementById(gen)
        for (value of gen_values){
            ins.push(value);
        }
    }
    targetName = which.getAttribute("name")
    //ClientSide check for blank input by selecting all input elements and checking for blanks
    

    // clone the template node
    var newStep = document.getElementById("item_template").content.cloneNode(true);

    // Iterate through the nodes content and apply that to the template
    let parts = which.querySelectorAll(".create-ins")
    //console.log(parts);

    // Add the text to the function
    // let text = newStep.querySelector("li");
    let newText = ""; 

    if (targetName === "ingredients"){
        // Check the value is an int
        if ((isNaN(ins[1]))){
            alert("Amount must be a number");
            return; 
        }
        newText = String(ins[1]) + " " + String(ins[2]).toLowerCase() + " of "  + String(ins[0]) 
        // Creating one large string for instructions to split in python
        value = String(ins[0]) + "%%" + String(ins[1]) + "%%" + String(ins[2]) + "`^"   

        ingredients.push(newText)
    }
    else {
        newText = String(ins[0])
        //This is the Next Value key
        value = "`^" + newText  
        instructions.push(newText)
    }
    // Apply the text
    let txt = newStep.querySelector("p");
    txt.innerHTML = newText;

    // Add the hiddent elements to the form as one large string seperated by special characters
    if (targetName === "instructions"){
        list = document.getElementById("instruction-submit-list")
    }
    else if (targetName === "ingredients"){
        list = document.getElementById("ingredient-submit-list")
    }
    list.value += value

    document.getElementById(which.getAttribute("data-assosiated-list")).appendChild(newStep);

    // Clear the input forms for the targeted region
    for (let part of parts){
        part.value = ""
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
    if (formDataJson["ingredients"].length > 0){
        iList = document.getElementById("ingredients-list")
        for (let i of formDataJson["ingredients"]){
            nextItem("x", "ingredient-form",i )
        }
    }
    if (formDataJson["instructions"].length > 0){
        for (let i of formDataJson["instructions"]){
            nextItem("x","instruct-form",i)
        }
    }
}

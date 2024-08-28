function updateValues(){
    // Get the value
    let s = document.getElementById("serveDisplay")
    let multiplier = Number(s.value) / Number(s.getAttribute("initialValue"))


    // Get a nodelist of all quantity nodes
    let quants = document.getElementsByClassName("quants")
    for (let q of quants){
        q.innerHTML = String(Math.round((q.getAttribute("value") * multiplier) * 100) / 100) + " "
    }

}
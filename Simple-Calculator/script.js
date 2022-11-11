// This function clear all the values
function clearScreen() {
    document.getElementById("result").value = "";
}


// This function display values
function display(value) {
    document.getElementById("result").value += value;
}

// This function evaluates the expression and return result
function calculate() {
    var p = document.getElementById("result").value;
    var q = eval(p);
    if (q == 1 / 0){
        display("Invalid Calculation")
    }else{
    document.getElementById("result").value = q;
    }
}

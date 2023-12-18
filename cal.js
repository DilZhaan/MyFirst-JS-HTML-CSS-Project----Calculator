//global VarDeclaration
let value1 ='' , value2 = '' ,num = '',pOperator = '';
let operationCounter = 0;

// this function used to display entered numbers and result  
function displayCrrent(msg){
    var existValue = document.getElementById("currentvalue").innerHTML;
    document.getElementById("currentvalue").innerHTML= existValue + String(msg);
}


// this function used to display arihmatic operation history
function displayHistory(key){
    if(operationCounter){   // bcs is there no operations -> it hasn't history

        var existHisValue = document.getElementById("history").innerHTML;
        var cuurentVal = document.getElementById("currentvalue").innerHTML;

        if(key == '=' && ['×','-','/','+'].includes( existHisValue[existHisValue.length - 1]  ) && !cuurentVal){
            existHisValue = existHisValue.slice(0,-1);
            document.getElementById("history").innerHTML= existHisValue + cuurentVal;

        }else{

            (key == '=') ? document.getElementById("history").innerHTML= existHisValue + cuurentVal 
            :   document.getElementById("history").innerHTML= existHisValue + cuurentVal + String(key);

        }
    }
}

// This function use to get paragraph in cuurentvalue para tag
function getValues(key){
    num = document.getElementById("currentvalue").innerHTML;
    (!value1 || ((pOperator == 'C' || key == 'C') && operationCounter == 0) ) ? value1 = Number(num) : value2 = Number(num);
    num = '';
}

//this function use to do Calculation part
function calVal(key){
    switch(pOperator){
        case '-':
            value1 -= value2;
            break;

        case '+':
            value1 += value2;
            break;

        case '×':
            value1 *= value2;
            break;

        case '/':
            value1 /= value2;
            break;
    }
    pOperator = key;         
}

//this function use to handle Arithmatic Operations
function operations(operator){
    displayHistory(operator);
    document.getElementById("currentvalue").innerHTML = '';
    if(pOperator) calVal();
    pOperator = operator;
}

//this function use to Clear the display -> it will clear the History and currentValue para tags contain values
function clearDisplay(){
    document.getElementById("history").innerHTML = '';
    document.getElementById("currentvalue").innerHTML = '';
}

// use to set all var to null or 0 
function clearValues(clearCmnd = ''){
    value1 = 0;
    value2 = 0;
    pOperator = '';
    operationCounter = 0;
}

// use to get key inputs and handle it
function keyPrint(key,event = ''){
    //if block handles Number keys and floating mark and it will display
    if((key < 10 && key >= 0 )|| key === '.'){
        if(pOperator == '='){ // we want to check previous operation is = or another. bcs if it is = , we want to clear the display and values and get next value newly
            clearDisplay();
            clearValues();
            displayCrrent(key);
        }else{
            displayCrrent(key);
        }

    //else block handle other keys
    }else{
        
        getValues(key);
        switch(key){
            case 'AC':
                clearDisplay();
                clearValues();
                break;

            case 'C':
                // in cal , if we press C , remove the last element on current value. I use slice method for it
                document.getElementById("currentvalue").innerHTML = document.getElementById("currentvalue").innerHTML.slice(0,-1); 
                getValues(key); // assign new values to varibles
                pOperator = key; 
                break;

            case '=':
                displayHistory('=');
                if(value2) calVal(key);
                document.getElementById("currentvalue").innerHTML= value1;
                break;
                
            default:
                if(value1 || key == '-'){
                    operationCounter++;
                    operations(key);
                }
        }
        key = '';
    }
}
document.addEventListener('keydown', function(event) {
    const keyin = event.key;
    if ((keyin >= 0&& keyin<=9) || keyin === '.' || keyin === '+' || keyin === '-' || keyin === '*' || keyin === '/' || keyin === '=') {
        keyPrint(keyin,event);
    }else if(keyin === 'Delete'){
        keyPrint('AC',event);
    }else if(keyin === 'Backspace'){
        keyPrint('C',event);
    }else if(keyin === 'Enter'){
        event.preventDefault();
        keyPrint('=',event);
    }
});
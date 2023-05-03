const lengthDisplay=document.querySelector('[data-lengthNumber]');
const inputSlider=document.querySelector('[data-lengthSlider]');

const passwordDisplay=document.querySelector('[data-passwordDisplay]');
const copyMsg=document.querySelector('[data-copyMsg]');
const copyButton=document.querySelector('[data-copy]');
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numbersCheck=document.querySelector('#numbers');
const symbolsCheck=document.querySelector('#symbols');
const indicator=document.querySelector('.circle');
const generateButton=document.querySelector('.generateButton');
const allCheckBox=document.querySelectorAll('input[type=checkbox]');
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength=10;
// passwordDisplay.value="hi";

let checkCount=0;
handleSlider();
// Set circle color to grey initially
setIndicator("grey");

// Set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength; 
}


function setIndicator(color){
    indicator.style.backgroundColor=color;
    // Box-Shadow
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

// function setColor(){
//     if(passwordLength==10){
//         setIndicator("grey");
//     }
//     else if(passwordLength<6){
//         setIndicator("red");
//     }
//     else if(passwordLength>6 && passwordLength<10){
//         setIndicator("yellow");
//     }
//     else{
//         setIndicator("green");
//     }
// }


function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,90));
}

function generateSymbol(){
    return symbols[getRandomInteger(0,symbols.length)];
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
    } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
    ) {
    setIndicator("#ff0");
    } else {
    setIndicator("#f00");
    }
}

// Copy content function
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    copyMsg.classList.add("active");

    setTimeout(function(){
        copyMsg.classList.remove("active");
    },2000)
}

// Event Listeners

// For Slider

inputSlider.addEventListener('input',function(e){
    passwordLength=e.target.value;
    handleSlider();
});

// Copy Button

copyButton.addEventListener('click',function(){
    if(passwordDisplay.value){
        copyContent();
    }
});


// CheckBox

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    // Special Case
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach(function(checkbox){
    checkbox.addEventListener('change',handleCheckBoxChange);
});

// Fisher Yates Method

function shufflePassword(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// Generate Button

generateButton.addEventListener('click',function(){
    // None of the checkbox are selected
    if(checkCount<=0){
        password="First mark the checkboxes!!"
        passwordDisplay.value=password;
        return;
    }
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    // Finding new password
    password="";

    // Finding checkboxes state

    let funcArr=[];

        if(uppercaseCheck.checked){
            funcArr.push(generateUpperCase);
        }
        if(lowercaseCheck.checked){
            funcArr.push(generateLowerCase);
        }
        if(numbersCheck.checked){
            funcArr.push(generateRandomNumber);
        }
        if(symbolsCheck.checked){
            funcArr.push(generateSymbol);
        }

    // Compulsory Addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    // Remaining Addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randomIdx=getRandomInteger(0,funcArr.length);
        let randomFunc=funcArr[randomIdx];
        password+=randomFunc();
    }

    // Shuffle the password
    password=shufflePassword(Array.from(password));

    // Display in UI
    passwordDisplay.value=password;

    calcStrength();

});








// let randomFunction=[generateLowerCase,generateRandomNumber,generateUpperCase,generateSymbol];

// generateButton.addEventListener('click',function(){
//     var checkboxArr=[uppercaseCheck,lowercaseCheck,numbersCheck,symbolsCheck];
//     // For All Checkboxes

//     var isAllChecked=true;
//     var isSingleCheck=false;
//     for(var i=0;i<allCheckBox.length;i++){
//         if(allCheckBox[i].checked==false){
//             isAllChecked=false;
//         }
//         if(allCheckBox[i].checked==true){
//             isSingleCheck=true;
//         }
//     }
//     password="";
//     if(isAllChecked){
        
//         password+=generateLowerCase();
//         password+=generateUpperCase();
//         password+=generateRandomNumber();
//         password+=generateSymbol();

//         for(let i=4;i<passwordLength;i++){
//             let randomIdx=getRandomInteger(0,randomFunction.length-1);
//             let randomFunc=randomFunction[randomIdx];
//             password+=randomFunc();
//         }

//         passwordDisplay.value=password;
//     }
    

//     else if(isSingleCheck==true){
//         // var count=0;
//         // for(let i=0;i<checkboxArr.length;i++){
//         //     if(checkboxArr[i].checked){
//         //         passwrod+=
//         //     }
//         // }
//     }

//     else{
//         password="Check mark kr pehle";
//         passwordDisplay.value=password;
//     }


    
// });

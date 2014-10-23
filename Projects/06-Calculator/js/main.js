 /*
 	define all variables
 	'$' prefix denotes jQuery objects
 */

 var $calculator;
 var $buttons;
 var $display;

 var currentValue = 0;
 var currentOperator = "";
 var currentInput = "";
 var lastInput = "";
 var lastPress = "";
 var operators = ["+", "-", "*", "/"];
 var hasOperated = false;
 var hasInput = false;
 var hasCalculated = false;

 // Wait for the document to be parsed and rendered before acting
 $(document).ready(function() {
 	// Cache jQuery objects
 	$calculator = $(".calculator");
 	$buttons = $(".button");
 	$display = $(".display");

 	// Bind events
 	$buttons.on("click", onButtonClick);

 	// Kick it off with a clean reset
 	reset();

 });

 function onButtonClick(e) {
 	// Cache local values
 	var $target = $(this);
 	var buttonValue = $target.text().toLowerCase();
 	var buttonCharCode = buttonValue.charCodeAt (0);

 	// Replace operator's special chars with real operators
 	if (buttonCharCode === 247) {
 		buttonValue = "/";
 	} else if (buttonCharCode === 215) {
 		buttonValue = "*";
 	}

 	// Delegate button action
 	if (buttonValue === "c") {
 		reset();
 	} else if (buttonValue === "=") {
 		calculateValue();
 	} else if (operators.indexOf(buttonValue) > -1) {
 		setOperator(buttonValue);
 	} else {
 		appendInput(buttonValue);
 	}

 }

// handle digit press
function appendInput(input) {
 	// Gaurd against multiple decimal presses
 	if (input === "." && currentInput.indexOf(".") > -1) {
 		return;
 	}

 	// If the last press was an operator,
 	// clear current input
 	if (lastPress === "operator") {
 			currentInput = input;
 	} else {
 		currentInput += input;
 	}

 	//Remove leading zeros
 	// for example in '022' the leading zero should not be displayed
 	if (currentInput.length > 1 && currentInput.slice(0, 1) === "0" && currentInput.slice(1, 1) !== ".") {
 			currentInput = currentInput.slice(1, currentInput.length);
 	}

 	// Make sure decimals have leading zeros
 	// for example '.15' should display a leading zero
 	if (currentInput.slice(0,1) === ".") {
 		currentInput = "0" + currentInput;
 	}

 	// Update application state
 	lastPress = "digit";
 	hasInput = true;
 	hasCalculated = false;

 	// Dont forget to update the display!
 	updateDisplay(currentInput);
}

// Calculate the Value
function calculateValue() {
	var input;

	// if we've already calculated but they keep hitting equal 
	// button we don't want to square the value
	if (hasCalculated) {
		input = parseFloat(lastInput);
	} else {
		input = parseFloat(currentInput);
		lastInput = input;
	}

	// Do the calculation
	switch (currentOperator) {
		case "+":
			currentValue += input;
			break;
		case "-":
			currentValue -= input;
			break;
		case "*":
			currentValue *= input;
			break;
		case "/":
			currentValue /= input;
			break;
		default:
			break;
	}

	// update application state
	lastPress = "operator";
	hasInput = false;
	hasCalculated = true;

	// Don't forget to update the display!
	updateDisplay(currentValue);
	currentInput = currentValue.toString()
}

// Reset application state
function reset() {
	currentValue = 0;
	currentOperator = "";
	currentInput = "";
	lastInput = "";
	lastPress = "";
	hasOperated = false;
	hasInput = false;
	hasCalculated = false;

	// don't forget to update the display
	updateDisplay(currentValue);

}

//Set current operator
function setOperator(operator) {
	// First, calculate if input-operator-input
	if (hasOperated && lastPress !== "operator") {
		calculateValue();
	}

	// set operator
	currentOperator = operator;
	currentValue = parseFloat(currentInput);

	// make sure we have a true number
	if (isNaN(currentValue)) {
		currentValue = 0;
	}

	// update application state
	lastPress = "operator";
	hasOperated = true;
	hasInput = false;
	hasCalculated = false;
}

// update display
function updateDisplay(value) {
	$display.val(value); 
}








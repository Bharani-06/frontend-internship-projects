let displayValue = ""; // Stores the current input or calculation

// Append a value to the display
function appendValue(value) {
  displayValue += value;
  document.getElementById("display").value = displayValue;
}

// Clear the display
function clearDisplay() {
  displayValue = "";
  document.getElementById("display").value = "0";
}

// Add an operator to the display
function operate(operator) {
  displayValue += operator;
  document.getElementById("display").value = displayValue;
}

// Calculate the result
function calculate() {
  try {
    displayValue = eval(displayValue); // Evaluate the math expression
    document.getElementById("display").value = displayValue;
  } catch (error) {
    alert("Invalid Input"); // Handle invalid input
    clearDisplay();
  }
}

# **Calculator**

## **Introduction**

The Calculator is a web application that creates a calculator interface for performing basic arithmetic operations and advanced functions such as percentage and parentheses handling. It uses [React](https://react.dev) and [MathJS](https://mathjs.org) to manage the calculator's state and operations.

## **Components and Functions**

### **State Variables**

- **`expression`**: An array representing the current mathematical expression in the calculator. It is updated when numbers, operations, or other elements are added.
- **`error`**: A string representing any errors that occur during evaluation or input handling.

### **Key Functions**

- **`getLastAddedItem()`**: Returns the last item in the **`expression`** array.
- **`getExpression()`**: Concatenates the items in the **`expression`** array and returns the expression as a string.
- **`addItem(item)`**: Adds an item to the **`expression`** array.
- **`handleNumberClick(number)`**: Handles click events for numbers by adding the number to the **`expression`** array.
- **`removeLastItem()`**: Removes the last item from the **`expression`** array.
- **`handleOperatorClick(operation)`**: Handles click events for arithmetic operators (plus, minus, product, divide) and adjusts the **`expression`** accordingly.
- **`handlePointClick()`**: Handles click events for the decimal point by adding it to the **`expression`** array while ensuring it is valid in the current context.
- **`handleParenthesesClick()`**: Manages click events for parentheses, adding open and close parentheses while balancing them.
- **`handlePercentageClick()`**: Handles click events for the percentage symbol, adding it to the **`expression`** array.
- **`handleClearAll()`**: Clears all items from the **`expression`** array and resets **`error`**.
- **`handleBackspace()`**: Removes the last item from the **`expression`** array and resets **`error`**.
- **`handleResultClick()`**: Evaluates the current expression and displays the result. It includes error handling for empty expressions, division by zero, and invalid calculations.

### **Sub-Components**

- **`NumberButton`**: Renders buttons for numbers based on an array of numbers, handling the click events.
- **`CalculatorButton`**: Renders buttons for specific actions such as arithmetic operations, percentage, and clear functions.
- **`RenderOutput`**: Displays the formatted expression or error message.

## **Usage**

The user can interact with the calculator using buttons to input numbers and operations. Handles the input and provides feedback such as displaying results or error messages.

## **Code Structure**

- The Calculator function starts with state variables for managing the expression and error state.
- Functions for handling user input and operations follow, including managing numbers, arithmetic operators, and special operations such as percentages and parentheses.
- Components for rendering buttons (**`NumberButton`**, **`CalculatorButton`**) and the display (**`RenderOutput`**) are defined to handle user interactions and display the current state of the calculator.
- The return statement contains the layout and structure of the calculator, including the header, button wrapper, and individual button sections.

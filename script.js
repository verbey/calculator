function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b == 0) return a;
	return a / b;
}

function modulo(a, b) {
	return a % b;
}

function factorial(a) {
	if (a == 0) return 1;
	else if (a < 0) return;
	else {
		let result = 1;
		for (let i = 1; i <= a; i++) {
			result *= i;
		}
		return result;
	}

}

function operate(a, b, operator) {
	if (operator == "+") return add(a, b);
	else if (operator == "-") return subtract(a, b);
	else if (operator == "*") return multiply(a, b);
	else if (operator == "/") return divide(a, b);
	else return factorial(a);
}

function refreshVariables(result = []) {
	activeOperand = result;
	firstOperand = [];
	operator = undefined;
	changeElementState(".equal", true);
	if (activeOperand.indexOf(".") != -1) changeElementState(".dot", true);
	else if (activeOperand.length == 0) changeElementState(".dot", true);
	else changeElementState(".dot", false);
}

function refreshDisplay() {
	const display = document.querySelector(".display");
	display.textContent = activeOperand.join("");
}

function changeElementState(selector, state) {
	const elements = document.querySelectorAll(selector);
	elements.forEach((item) => {
		item.disabled = state;
	});
}

let firstOperand, activeOperand, operator;

const buttons = document.querySelectorAll("button");

refreshVariables();

buttons.forEach((item) => {
	if (item.classList.contains("operand")) {
		item.addEventListener("click", () => {
			activeOperand[activeOperand.length] = item.textContent;
			if (activeOperand.length == 1) changeElementState(".dot", false);
			if (activeOperand[0] != undefined && firstOperand[0] != undefined) changeElementState(".equal", false);
			if (item.classList.contains("dot")) changeElementState(".dot", true);
			refreshDisplay();
		});
	}
	else if (item.classList.contains("operator")) {
		item.addEventListener("click", () => {
			operator = item.textContent;
			firstOperand = activeOperand;
			activeOperand = [];
			changeElementState(".dot", false);
			refreshDisplay();
		});
	}
	else if (item.classList.contains("equal")) {
		item.addEventListener("click", () => {
			const result = operate(Number(firstOperand.join("")), Number(activeOperand.join("")), operator);
			const resultArr = result.toString().split("");
			refreshVariables(resultArr);
			refreshDisplay();
		});
	}
	else if (item.classList.contains("clear")) {
		item.addEventListener("click", () => {
			refreshVariables();
			refreshDisplay();
		});
	}
	else if (item.classList.contains("delete")) {
		item.addEventListener("click", () => {
			const popped = activeOperand.pop();
			if (popped == ".") changeElementState(".dot", false);
			if (activeOperand.indexOf(popped) == 0) {
				changeElementState(".equal", true);
				changeElementState(".dot", true);
			}
			refreshDisplay();
		});
	}
	else if (item.classList.contains("factorial")) {
		item.addEventListener("click", () => {
			const result = operate(Number(activeOperand.join("")), "!");
			const resultArr = result.toString().split("");
			refreshVariables(resultArr);
			refreshDisplay();
		});
	}
	else if (item.classList.contains("plusMin")) {
		item.addEventListener("click", () => {
			if (activeOperand.indexOf("-") == -1) activeOperand.unshift("-");
			else activeOperand.shift();
			refreshDisplay();
		});
	}
});
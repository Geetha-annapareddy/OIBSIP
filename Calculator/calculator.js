function func(val) {
	if (val == 'a' || val == 'd' || val == 'c') {
		return
	}
	else {
		var text = val;
		document.getElementById('inarea').value += text;
	}
}


function clr() {
	document.getElementById("inarea").value = '';
	document.getElementById("outarea").value = '';
}


function del() {
	a = document.getElementById("inarea").value;
	a = a.substring(0, a.length - 1);
	document.getElementById("inarea").value = a;
}


var stack = []
let f = 1;


function exp() {
	var expr = '(' + document.getElementById('inarea').value + ')';
	stack = [];
	for (let i = 0; i < expr.length; i++) {
		if (expr[i] == '(') {
			stack.push(expr[i])
		}
		else if (expr[i] == ')') {
			if (stack[stack.length - 1] == '(') {
				if (stack.length != 0) {
					stack.pop()

				}
				else {
					f = 0;
					break
				}

			}
		}
	}
	if (stack.length == 0) {
		if (f == 0) {
			alert("Invalid format of input")
			clr();
			return
		}
		else {
			removeSpaces(expr)
		}
	}
	else {
		alert("Invalid format of input")
		clr();
		return
	}
}


function removeSpaces(exp1) {
	var p = exp1.replaceAll(' ', '');
	eval(p)
}

// for multidigits as input
function eval(e1) {
	var z = []
	let z1 = 0
	let c = 0
	for (i = 0; i < e1.length; i++) {
		z1 = 0
		c = 0
		if (operator(e1[i])) {
			z.push(e1[i])
		}
		else {
			let a = '';
			j = i
			while (!operator(e1[j])) {
				c += 1
				a += e1[j]
				j += 1
			}
			c -= 1
			z.push((a))
		}
		i += c
	}
	infixtoPost(z)
}

function operator(ex) {
	if (ex == '(' || ex == ')' || ex == '*' || ex == '/' || ex == '-' ||
		ex == '+' || ex == '^') {
		return 1;
	}
	else {
		return 0;
	}
}

// Created an empty array
var stackarr = [];

// Variable topp initialized with -1
var topp = -1;

// Push function for pushing
// elements inside stack
function push1(e) {
	topp++;
	stackarr[topp] = e;
}

// Pop function for returning top element
function pop1() {
	if (topp == -1)
		return 0;
	else {
		var popped_ele = stackarr[topp];
		topp--;
		return popped_ele;
	}
}


// Function to return the precedency of operator
function precedency(pre) {
	if (pre == '@' || pre == '(' || pre == ')') {
		return 1;
	}
	else if (pre == '+' || pre == '-') {
		return 2;
	}
	else if (pre == '/' || pre == '*') {
		return 3;
	}
	else if (pre == '^') {
		return 4;
	}
	else
		return 0;
}

// Function to convert Infix to Postfix
function infixtoPost(infixval) {

	// Postfix array created
	var postfix = [];
	var temp = 0;
	push1('@');

	// Iterate on infix string
	for (var i = 0; i < infixval.length; i++) {
		var el = infixval[i];

		// Checking whether operator or not
		if (operator(el)) {
			if (el == ')') {
				while (stackarr[topp] != "(") {
					postfix[temp++] = pop1();
				}
				pop1();
			}

			// Checking whether el is ( or not
			else if (el == '(') {
				push1(el);
			}

			// Comparing precedency of el and
			// stackarr[topp]
			else if (precedency(el) > precedency(stackarr[topp])) {
				push1(el);
			}
			else {
				while (precedency(el) <=
					precedency(stackarr[topp]) && topp > -1) {
					postfix[temp++] = pop1();
				}
				push1(el);
			}
		}
		else {
			postfix[temp++] = el;
		}
	}

	// Adding character until stackarr[topp] is @
	while (stackarr[topp] != '@') {
		postfix[temp++] = pop1();
	}
	let ans = evaluatePostfix(postfix)
	let ans2 = ans.toFixed(4);
	ch=ans2.indexOf('.')
	let ans3=ans2.substring(ch+1)
	if(ans3==0){
		let final=ans2.substring(0,ch);
		document.getElementById('outarea').value = final
	}
	else{
		document.getElementById('outarea').value = ans2
	}
	
	
}

function evaluatePostfix(exp) {
	//create a stack
	let stack = [];

	// Scan all characters one by one
	for (let i = 0; i < exp.length; i++) {
		let c = exp[i];
		// If the scanned character is an operand (number here),
		// push it to the stack.
		if (!operator(c)) {
			stack.push(c);
		}

		// If the scanned character is an operator, pop two
		// elements from stack apply the operator
		else {
			let val1 = stack.pop();
			let val2 = stack.pop();

			switch (c) {
				case '+':
					stack.push(val2 + val1);
					break;

				case '-':
					stack.push(val2 - val1);
					break;

				case '/':
					stack.push(val2 / val1);
					break;

				case '*':
					stack.push(val2 * val1);
					break;
			}

		}
	}
	return stack.pop();
}


var color=['red','green','blue','yellow','orange','violet'];

var side = 7;

var start = document.getElementById('start');
var wrap = document.getElementById('wrap');
wrap.style.width = side*50 + 'px';
wrap.style.height = side*50 + 'px';
creatingOfNet();

start.onclick=StartGame;


function StartGame() {
	start.setAttribute('disabled', true);

	var row = 1;
	var col = side;
	var number = 1;
	
	var interval = setInterval( function () {
		for (var j = 0; j < side; j++) {
		Create() }
		}, 300);

	function Create() {
		
		var rows = document.getElementsByClassName('row' + col);
		var cols = document.getElementsByClassName('col' + row);
		// console.log(cols);
		var type = Math.floor(Math.random() * 6);
		
		var jewType = CheckColor(type, row, rows, col, cols);
		
		
		// if (col < 6) {
		// 	// console.log(cols[col].firstChild.getAttribute('type') + ':' + cols[col + 1].firstChild.getAttribute('type'));
		// 	if  {
		// 		console.log('change1');
		// 		if (cols[col].firstChild.getAttribute('type') == type) {
		// 			console.log('change');
		// 			type = ChangeColor(type);
		// 		}
		// 	}
		// }
		var d = new Jewel(jewType);
		d.draw(rows[row - 1], number);
		
		number++;
		row++;
		if (row > side) {
			row = 1;
			col--;
		}

		if (col == 0)
			clearInterval(interval);
	}
}

function Jewel(type){
	this.type = type;
	this.color = color[type];
	this.draw=function(item,data){
		var jew=document.createElement('div');
		jew.className='jewels';
		jew.setAttribute('data-n', data);
		jew.style.background=this.color;
		jew.setAttribute('type', type);
		item.appendChild(jew);
	};
}

function creatingOfNet(){
	var colClass = 1;
	var rowClass = 1;
	for(var i = 1; i < side*side+1; i++) {
		var block = document.createElement('div');
		block.classList.add('blockForJew', 'col' + colClass, 'row' + rowClass);
		colClass++;
		if (colClass > side) {
			colClass = 1;
			rowClass++;
		}
		wrap.appendChild(block);
	}
}
function CheckColor(type, row, rows, col, cols) {
	if ((row > 2) && (col < 6)) {
		if ((rows[row - 2].firstChild.getAttribute('type') == rows[row - 3].firstChild.getAttribute('type')) &&
			(cols[col].firstChild.getAttribute('type') == cols[col + 1].firstChild.getAttribute('type'))) {
			if (type == rows[row - 2].firstChild.getAttribute('type') || type == cols[col].firstChild.getAttribute('type')) {
				console.log('!!!!');
				var typeCol = cols[col + 1].firstChild.getAttribute('type');
				var typeRow = rows[row - 3].firstChild.getAttribute('type');
				type = DeepChangeColor(typeCol, typeRow);
			}
		}
		else if ((rows[row - 2].firstChild.getAttribute('type') == rows[row - 3].firstChild.getAttribute('type')) ||
				(cols[col].firstChild.getAttribute('type') == cols[col +1].firstChild.getAttribute('type'))) {
			
			if ((rows[row - 2].firstChild.getAttribute('type') == rows[row - 3].firstChild.getAttribute('type')) ||
				(cols[col].firstChild.getAttribute('type') == cols[col + 1].firstChild.getAttribute('type'))) {
				console.log(type + ' in row/col');
				type = ChangeColor(type);
			}
		}
	}
	
	if (col < 6) {
		if (type == cols[col].firstChild.getAttribute('type')) {
			console.log(type + ' in col ');
			if (cols[col].firstChild.getAttribute('type') == cols[col +1].firstChild.getAttribute('type')) {
				type = ChangeColor(type);
			}
		}
	}
	if (row > 2) {
		
		if (type == rows[row - 2].firstChild.getAttribute('type')) {
			console.log(type + ' in row ');
			if (rows[row - 2].firstChild.getAttribute('type') == rows[row - 3].firstChild.getAttribute('type')) {
				type = ChangeColor(type);
			}
		}
	}

	return type;
}

function ChangeColor(previousColor) {
	// var colorForChange= [];
	// for (var i = 0; i < color.length; i++) {
	// 	colorForChange[i] = color[i];
	// }
	// colorForChange.splice(colorForDeep.indexOf(previousColor), 1);
		var type = Math.floor(Math.random() * 6);
		if (type == previousColor) {
			ChangeColor(type);
		}
		console.log(previousColor + ' changed on ' + type);
		return type;
}
function DeepChangeColor(typeCol, typeRow) {
	var colorForDeep = [];
	for (var i = 0; i < color.length; i++) {
		colorForDeep[i] = color[i];
	}
	console.log(color);
	colorForDeep.splice(colorForDeep.indexOf(typeRow), 1);
	colorForDeep.splice(colorForDeep.indexOf(typeCol), 1);
	console.log(colorForDeep);
	console.log(color);
	var newType = colorForDeep[Math.floor(Math.random()*4)];
	console.log(typeCol + ' & ' + typeRow + ' changed on ' + color.indexOf(newType));
	return color.indexOf(newType);
}
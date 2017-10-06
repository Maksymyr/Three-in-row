var color=['red','green','blue','yellow','orange','violet'];

var side = 7;
var restartFlag = 0;
var checkbox = true;

var wrap = document.getElementById('wrap');
wrap.style.width = side*50 + 'px';
wrap.style.height = side*50 + 'px';

var start = document.getElementById('start');




	start.onclick = StartGame;


function StartGame() {
	if (checkbox) {
		checkbox = false;
		if (restartFlag == 0) {
			start.remove();
			var restart = document.createElement('button');
			restart.innerHTML = 'Restart';
			document.getElementById('down-case').appendChild(restart);
			restart.onclick = StartGame;
		}
		if (restartFlag > 0) {
			for (var i = 0; i < side * side; i++) {
				wrap.innerHTML = '';
			}
		}
		wrap = document.getElementById('wrap');
		wrap.style.width = side * 50 + 'px';
		wrap.style.height = side * 50 + 'px';
		creatingOfNet();
		
		
		var row = 1;
		var col = side;
		var number = 1;
		
		var interval = setInterval(function () {
			for (var j = 0; j < side; j++) {
				Create()
			}
		}, 300);
		
		function Create() {
			
			var rows = document.getElementsByClassName('row' + col);
			var cols = document.getElementsByClassName('col' + row);
			// console.log(cols);
			var type = Math.floor(Math.random() * 6);
			// console.log(row + ' ' + col);
			
			var jewType = CheckColor(type, row, rows, col, cols);
			
			
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
		
		restartFlag++;
		setTimeout(function () {
			checkbox = true;
		}, side*305);
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
			if (type == rows[row - 3].firstChild.getAttribute('type') || type == cols[col + 1].firstChild.getAttribute('type')) {
				// console.log('!!!! ' + color[type] + ' in col ' + row +' row ' + col);
				var typeCol = cols[col + 1].firstChild.getAttribute('type');
				var typeRow = rows[row - 3].firstChild.getAttribute('type');
				type = DeepChangeColor(typeCol, typeRow);
			}
		}
		else if (rows[row - 2].firstChild.getAttribute('type') == rows[row - 3].firstChild.getAttribute('type')) {
			if (type == rows[row - 3].firstChild.getAttribute('type')) {
				type = ChangeColor(type);
			}
		}
		else if (cols[col].firstChild.getAttribute('type') == cols[col + 1].firstChild.getAttribute('type')) {
			if (type == cols[col + 1].firstChild.getAttribute('type')) {
				type = ChangeColor(type);
			}
		}
	}
	else  if ((col < 6) || (row > 2)) {
		if (col < 6) {
			if (type == cols[col].firstChild.getAttribute('type')) {
				
				if (type == cols[col + 1].firstChild.getAttribute('type')) {
					console.log(color[type] + ' col: in col ' + row + ' row ' + col);
					type = ChangeColor(type);
				}
			}
		}
		if (row > 2) {
			
			if (type == rows[row - 2].firstChild.getAttribute('type')) {
				
				if (type == rows[row - 3].firstChild.getAttribute('type')) {
					console.log(color[type] + ' row: in col ' + row + ' row ' + col);
					type = ChangeColor(type);
				}
			}
		}
	}

	return type;
}
function ChangeColor(previousColor) {
	var colorForChange= [];
	for (var i = 0; i < color.length; i++) {
		colorForChange[i] = color[i];
	}
	console.log('i ve changed ' + color[previousColor]);
	colorForChange.splice(previousColor, 1);
	console.log(colorForChange);
	var newType = colorForChange[Math.floor(Math.random() * 5)];
	console.log('on '+ newType);
		return color.indexOf(newType);
}
function DeepChangeColor(typeCol, typeRow) {
	var colorForDeep = [];
	// console.log('i ve changed ' + color[typeRow] + ' or '+ color[typeCol]);
	for (var i = 0; i < color.length; i++) {
		colorForDeep[i] = color[i];
	}
	colorForDeep.splice(typeRow, 1);
	colorForDeep.splice(typeCol, 1);
	var newType = colorForDeep[Math.floor(Math.random()*4)];
	// console.log('on '+ newType);
	return color.indexOf(newType);
}
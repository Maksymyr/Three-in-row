	// var color=['images/paladin.png','images/rogue.png','images/mage.png','images/shaman.png','images/warrior.png','images/druid.png'];
	var color=['red','blue','green','yellow','orange','violet'];
	
	var side = 7;
	var restartFlag = 0;
	var checkbox = true;
	var score = 0;
	var score_box = document.getElementById("score_box");
	score_box.value = score;
	
	var wrap = document.getElementById('wrap');
	wrap.style.width = side*50 + 'px';
	wrap.style.height = side*50 + 'px';
	
	var start = document.getElementById('start');
	
		start.onclick = StartGame;
		
	
	
	function StartGame() {
		if (checkbox) {
			checkbox = false;
			if (restartFlag === 0) {
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
			var interval = setInterval(function () { for (var j = 0; j < side; j++) { Create() } }, 300);
			function Create() {
				var rows = document.getElementsByClassName('row' + col);
				var cols = document.getElementsByClassName('col' + row);
				var type = Math.floor(Math.random() * 6);
				var jewType = CheckColor(type, row, rows, col, cols);
				var d = new Jewel(jewType);
				d.draw(rows[row - 1], number);
				number++;
				row++;
				if (row > side) {
					row = 1;
					col--;
				}
				if (col === 0)
					clearInterval(interval);
			}
			restartFlag++;
			setTimeout(function () {
				checkbox = true;
				var click = 0;
				var jewFirst= 0;
				var allJews = wrap.getElementsByClassName('jewels');
				for (var i = 0; i < allJews.length; i++) {
					allJews[i].onclick = JewClick;
				}
				function JewClick() {
	
					
					
					
					if (click === 0) {
						jewFirst = event.target;
						event.target.style.border = '2px solid white';
						click++;
					}
					else if (click === 1) {
						var data = parseInt(jewFirst.getAttribute("data-n"));
						var data2 = parseInt(event.target.getAttribute("data-n"));
						if (data+7 === data2 || data-7 === data2 || data+1 === data2 || data-1 === data2) {
							var firstColor = jewFirst.getAttribute('type');
							jewFirst.setAttribute('type', event.target.getAttribute('type'));
							jewFirst.style.backgroundColor = color[event.target.getAttribute('type')];
							jewFirst.style.border = 'none';
							var secondColor = event.target.getAttribute('type');
							// event.target.removeAttribute('type');
							event.target.setAttribute('type', firstColor);
							event.target.style.backgroundColor = color[firstColor];
							if (!CheckThree()) {
								jewFirst.setAttribute('type', firstColor);
								jewFirst.style.backgroundColor = color[firstColor];
								jewFirst.style.border = 'none';
								event.target.setAttribute('type', secondColor);
								event.target.style.backgroundColor = color[secondColor];
							}
							click = 0;
							jewFirst = 0;
							
						}
						else {
							jewFirst.style.border = 'none';
							click = 0;
							jewFirst = 0;
						}
					}
				}
				
				
				
				
				
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
			// jew.style.backgroundImage='url("' + this.color + '")';
			jew.style.backgroundColor = this.color;
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
						type = ChangeColor(type);
					}
				}
			}
			if (row > 2) {
				
				if (type == rows[row - 2].firstChild.getAttribute('type')) {
					
					if (type == rows[row - 3].firstChild.getAttribute('type')) {
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
		colorForChange.splice(previousColor, 1);
		var newType = colorForChange[Math.floor(Math.random() * 5)];
			return color.indexOf(newType);
	}
	function DeepChangeColor(typeCol, typeRow) {
		var colorForDeep = [];
		for (var i = 0; i < color.length; i++) {
			colorForDeep[i] = color[i];
		}
		colorForDeep.splice(typeRow, 1);
		colorForDeep.splice(typeCol, 1);
		var newType = colorForDeep[Math.floor(Math.random()*4)];
		return color.indexOf(newType);
	}
	function CheckThree() {
		for (var j = 1; j < 8; j++) {
			var type_check_row = null;
			var count_check_row = 0;
			var array_check_row = [];
			var type_check_col = null;
			var count_check_col = 0;
			var array_check_col = [];
			for (var i = 0; i < 6; i++) {
				if (document.getElementsByClassName("row"+j)[i].firstChild.getAttribute("type") ===
					document.getElementsByClassName("row"+j)[i+1].firstChild.getAttribute("type")) {
					count_check_row++;
					array_check_row.push(i);
					type_check_row = document.getElementsByClassName("row"+j)[i].firstChild.getAttribute("type");
					if (i===5) {
						if (count_check_row >= 2) {
							DestroyThreeRow(count_check_row+1, array_check_row, j);
							ScoreCount(count_check_row+1);
							count_check_row = 0;
							array_check_row = [];
							return true;
						}
						else {
							count_check_row = 0;
							array_check_row = [];
						}
					}
				}
				else {
					if (count_check_row >= 2) {
						DestroyThreeRow(count_check_row+1, array_check_row, j);
						ScoreCount(count_check_row+1);
						count_check_row = 0;
						array_check_row = [];
						return true;
						}
					else {
						count_check_row = 0;
						array_check_row = [];
					}
				}
				if (document.getElementsByClassName("col"+j)[i].firstChild.getAttribute("type") ===
					document.getElementsByClassName("col"+j)[i + 1].firstChild.getAttribute("type")) {
					count_check_col++;
					array_check_col.push(i);
					type_check_col = document.getElementsByClassName("col"+j)[i].firstChild.getAttribute("type");
					if (i===5) {
						if (count_check_col >= 2) {
							DestroyThreeCol(count_check_col+1, array_check_col, j);
							ScoreCount(count_check_col+1);
							count_check_col = 0;
							array_check_col = [];
							return true;
						}
						else {
							count_check_col = 0;
							array_check_col = [];
						}
					}
				}
				else {
					if (count_check_col >= 2) {
						DestroyThreeCol(count_check_col+1, array_check_col, j);
						ScoreCount(count_check_col+1);
						count_check_col = 0;
						array_check_col = [];
						return true;
					}
					else {
						count_check_col = 0;
						array_check_col = [];
					}
				}
			}
		}
	}
	function DestroyThreeRow(count, array, row) {
		var index_st = array[0];
		for (var i = 0; i < count; i++) {
			for (var j = row-1; j > 0; j--) {
				var type_temp = document.getElementsByClassName("row"+(j))[index_st+i].firstChild.getAttribute("type");
				document.getElementsByClassName("row"+(j+1))[index_st+i].firstChild.setAttribute("type", type_temp);
				document.getElementsByClassName("row"+(j+1))[index_st+i].firstChild.style.backgroundColor = color[type_temp];
			}
			var newTypeRand = Math.floor(Math.random()*6);
			document.getElementsByClassName("row1")[index_st+i].firstChild.setAttribute("type", newTypeRand);
			document.getElementsByClassName("row1")[index_st+i].firstChild.style.backgroundColor = color[newTypeRand];
		}
		setTimeout(CheckThree(),1000);
	}
	function DestroyThreeCol(count, array, col) {
		var index_st = array[1]+2;
				for (var j = index_st; j > 0; j--) {
					if (j > index_st - (index_st - count)) {
						var type_temp = document.getElementsByClassName("row" + (j - count))[col - 1].firstChild.getAttribute("type");
						document.getElementsByClassName("row" + (j))[col - 1].firstChild.setAttribute("type", type_temp);
						document.getElementsByClassName("row" + (j))[col - 1].firstChild.style.backgroundColor = color[type_temp];
					}
					else {
						var newTypeRand = Math.floor(Math.random()*6);
						document.getElementsByClassName("row"+j)[col-1].firstChild.setAttribute("type", newTypeRand);
						document.getElementsByClassName("row"+j)[col-1].firstChild.style.backgroundColor = color[newTypeRand];
					}
				}
		
		setTimeout(CheckThree(),1000);
	}
	function ScoreCount(count) {
		switch (count) {
			case 3: score+=100; break;
			case 4: score+=250; break;
			case 5: score+=300; break;
			case 6: score+=1000; break;
			case 7: score+=5000; break
		}
		score_box.value = score;
	}
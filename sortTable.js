window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
};


//返回table数组
function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		for (var j = 0; j < tables[i].rows[0].cells.length; j++) {
			tables[i].rows[0].cells[j].onclick = makeSort;
		}
	}
}

function makeSort() {
	//-->从cell获得table对象//
	var table = this.parentElement.parentElement.parentElement;
	var arr = new Array;
	var sortflag; 
	var sortCol; //记录排序的那一列

	//根据CSS来判断升序或降序排列
	if (hasClass(this, "sortAscend")) {
		sortflag ="descend";
		removeClass(this, "sortAscend");
		addClass(this, "sortDescend");
	} else {
		if (hasClass(this, "sortDescend")) {
			sortflag = "ascend";
			removeClass(this, "sortDescend");
			addClass(this, "sortAscend");
		} else {
			sortflag = "ascend";
			addClass(this, "sortAscend");
		}
	}
//当按了某列(记录下列号)时其他列复原
	for (var i = 0; i < table.rows[0].cells.length;i++) {
		var tmp = table.rows[0].cells[i];
		if (tmp == this) {
			sortCol = i;
		} else {
			removeClass(tmp, "sortAscend");
			removeClass(tmp, "sortDescend");
		}
	}

	//初始化获得所有的除表头外的行的数组
	for (var i = 1; i < table.rows.length; i++) {
		arr.push(table.rows[i]);
		//alert("push "+i);
	}

	//进行排序
	switch(sortflag) {
		case "ascend":
			arr.sort(compare(sortCol));
			break;
		case "descend":
			arr.sort(compare2(sortCol));
			break;
	}

//创建文档碎片整理页面
	var Fragment = document.createDocumentFragment();
	for (var i = 0; i < arr.length; i++){
		Fragment.appendChild(arr[i]);
		//alert(table.rows.length);
	}
	
	table.appendChild(Fragment);
	

	//设置行背景色
	setBackGround(table.rows);
}

function setBackGround (Rows) {
	for (var i = 1; i < Rows.length; i++) {
		if (i%2) {
			removeClass(Rows[i], "alternate");
		} else {
			addClass(Rows[i], "alternate");
		}
	}
}

//数组sort方法的自定义比较函数
function compare(col) {
	return function (row1, row2) {
		var text1 = row1.cells[col].innerHTML.toString();
		var text2 = row2.cells[col].innerHTML.toString();
		if (text1 < text2)
			return -1;
		else
			return 1;
	};
}

function compare2(col) {
	return function (row1, row2) {
		var text1 = row1.cells[col].innerHTML.toString();
		var text2 = row2.cells[col].innerHTML.toString();
		if (text1 < text2)
			return 1;
		else
			return -1;
	};
}


function hasClass(element, className) {
	if (!element) return;  
    var elementClassName = element.className;  
    if (elementClassName.length == 0) return false;  
    if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))  
      return true;  
    return false; 
}
 
function addClass(element, className) {
	if (!this.hasClass(element, className))
	{
		element.className += " "+className;
	}
}
 
function removeClass(element, className) {
  	if (!element) return;  
    var elementClassName = element.className;  
    if (elementClassName.length == 0) return;  
    if(elementClassName == className)  
    {  
        element.className = "";  
        return;  
    }  
    if (elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))  
        element.className = elementClassName.replace((new RegExp("(^|\\s)" + className + "(\\s|$)"))," "); 
}



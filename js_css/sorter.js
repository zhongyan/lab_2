window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
};


function makeSort() {
	
	var table = this.parentElement.parentElement.parentElement;
	var arr = new Array;
	var flag = 0; //0:没有排序， 1：正序 -1：逆序
	var sortCol; //记录排序的那一列

	//判断是否同一列排过序。排过则逆序且改变图标
	//并且将其他列的效果去掉
	if (hasClass(this, "sortUp")) {
		flag = 1;
		removeClass(this, "sortUp");
		addClass(this, "sortDown");
	} else {
		if (hasClass(this, "sortDown")) {
			flag = -1;
			removeClass(this, "sortDown");
			addClass(this, "sortUp");
		} else {
			flag = 0;
			addClass(this, "sortUp");
		}
	}

	for (var i = 0; i < table.rows[0].cells.length;i++) {
		var tmp = table.rows[0].cells[i];
		if (tmp == this) {
			sortCol = i;
		} else {
			removeClass(tmp, "sortUp");
			removeClass(tmp, "sortDown");
		}
	}

	//初始化
	for (var i = 1; i < table.rows.length; i++) {
		arr.push(table.rows[i]);
	}

	//进行排序
	switch(flag) {
		case 0:
			arr.sort(com(sortCol));
			break;
		case -1:
		case 1:
			arr.reverse();
			break;
	}

	//整理页面
	var oFragment = document.createDocumentFragment();
	for (var i = 0; i < arr.length; i++)
		oFragment.appendChild(arr[i]);
	table.appendChild(oFragment);

	//奇偶背景设置
	setBackGround(table.rows);
}

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

function hasClass(element, className) {
	if (!element) return;  
    var elementClassName = element.className;  
    if (elementClassName.length == 0) return false;  
    //用正则表达式判断多个class之间是否存在真正的class（前后空格的处理）  
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





function setBackGround (colRows) {
	for (var i = 1; i < colRows.length; i++) {
		if (i%2) {
			removeClass(colRows[i], "change");
		} else {
			addClass(colRows[i], "change");
		}
	}
}

//数组sort方法的自定义比较函数
function com(sortCol) {
	return function (oTR1, oTR2) {
		var sx = oTR1.cells[sortCol].innerHTML.toString();
		var sy = oTR2.cells[sortCol].innerHTML.toString();
		if (sx < sy)
			return -1;
		else
			return 1;
	};
}



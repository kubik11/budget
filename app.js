// Init budget model 

var budgetModel = (function(){
	var data, dataObject, budgetUI, DOMstring; 
	 data = [];
	function Values(description, count, act, id){

		this.description = description;
		this.count = count;
		this.act = act;
		this.id = id;
	}
	// percentage upone each of elements
	var percent = function(a, b){
		var current;
			current = Math.round((a / b)*100) + "%";
		return current;
	}
	// Set the item ID
	var setId = function(){
		var id;
		if(data.length > 0){
			id = data[data.length - 1].id + 1;
		}else{
			id = 0;
		}
		return id;
	}
	// Delite budget item 
	function delIt(elem){
		var item = elem.split('-');
		data.forEach(function(element, i, arr){
			if(arr[i].id == item[1]){
				arr.splice(i, 1);
			}
		});
	}
	// Object where sit all current data
	var currentData = {
		income: 0,
		expenses: 0,
		total: function(){
			return this.income - this.expenses;
		},
		month: function(){
			var date = new Date();
			date = date.getUTCMonth();
			switch(date){
				case 0:
					date = 'January';
						break;
				case 1: 
					date = 'Fabruary';
						break;
				case 2: 
					date = 'March';
						break;
				case 3: 
					date = 'April';
						break;
				case 4: 
					date = 'May';
						break;
				case 5: 
					date = 'June';
						break;
				case 6: 
					date = 'July';
						break;
				case 7: 
					date = 'August';
						break;
				case 8: 
					date = 'September';
						break;
				case 9: 
					date = 'October';
						break;
				case 10: 
					date = 'November';
						break;
				case 11: 
					date = 'December';
						break;
			}
			return date;
		},
		percentage: function(){
			var per;
			if(this.expenses == 0){
				per = '--';
			}else{
				per = Math.round((this.expenses / this.income)*100) + "%";
			}
			return per;
		},
		toCalculate: function(){
			var self = this;
			// data.forEach(function(elem, i, arr){
				// if(arr[arr.length - 1].act == 'inc'){
					// self.toInc(elem[elem.length - 1].count);
				// }else if(arr[arr.length - 1].act == 'exp'){
					// self.toExp(elem[arr.length - 1].count);
				// }
			// });
				if(data[data.length - 1].act == 'inc'){
					self.toInc(data[data.length - 1].count);
				}else{
					self.toExp(data[data.length - 1].count);
				}
		},
		 // addition 
		toInc: function(el){
			console.log('hello');
			this.income += el;
			// this.total();
		},
		// subtraction
	    toExp: function(el){
			console.log('fuck off');
			this.expenses += el;
			// this.total();
		},
		update: function(){
			this.income = 0;
			this.expenses = 0;
			var self = this;
			data.forEach(function(e, i, arr){
				if(arr[i].act == 'inc'){
					self.income += arr[i].count;
					console.log('its work');
				}
				if(arr[i].act == 'exp'){
					self.expenses += arr[i].count;
				}
			});
		}
	}
	// return public methods
	return {
		setItem: function(d, c, a, i){
			data.push(new Values(d, c, a, i));
		},
		test: function(){
			return data;
		},
		toCalc: function(){
			return currentData.toCalculate();
		},
		income: function(){
			return currentData.income;
		},
		expenses: function(){
			return currentData.expenses;
		},
		total: function(){
			return currentData.total();
		},
		itemId: function(){
			return setId();
		},
		getPersentage: function(){
			return currentData.percentage();
		},
		itemPercent: function(){
			return percent(data[data.length - 1].count, currentData.income);
		},
		setEachPercent: function(){
			data[data.length - 1].each = percent(data[data.length - 1].count, currentData.income);
		},
		itemDel: function(el){
			return delIt(el);
		},
		upDate: function(){
			return currentData.update();
		},
		getMonth: function(){
			return currentData.month();
		}
	}

})()


// Init buget UI

var budgetUI = (function(){

	var DOMstring  = {
		addButton: '.add__btn',
		action: '.add__type',
		description: '.add__description',
		count: '.add__value',
		income: '.budget__income--value',
		expense: '.budget__expenses--value',
		total: '.budget__value',
		incomeList: '.income__list',
		expensesList: '.expenses__list',
		percent: '.budget__expenses--percentage',
		itemDel: '.container',
		month: '.budget__title--month'
		// itemPercent: '.item__percentage'
	}
	// set the month
	function setMonth(m){
		document.querySelector(DOMstring.month).textContent = m;
	}
	// update the buget UI
	function update(inc, exp, tot){
		document.querySelector(DOMstring.income).textContent = inc;
		document.querySelector(DOMstring.expense).textContent = exp;
		document.querySelector(DOMstring.total).textContent = tot;
	}
	// add items to Users interface list
	function addItem(objType){
		var html, incList, expList, itemPer;
			incList = document.querySelector(DOMstring.incomeList);
			expList = document.querySelector(DOMstring.expensesList);
		if(objType[objType.length - 1].act == 'inc'){
			html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			html = html.replace('%id%', objType[objType.length - 1].id);
			html = html.replace('%description%', objType[objType.length - 1].description);
			html = html.replace('%value%', objType[objType.length - 1].count);
			incList.insertAdjacentHTML('beforeend', html);
		}else{
			html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">%21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			html = html.replace('%id%', objType[objType.length - 1].id);
			html = html.replace('%description%', objType[objType.length - 1].description);
			html = html.replace('%value%', objType[objType.length - 1].count);
			html = html.replace('%21%', objType[objType.length - 1].each);
			expList.insertAdjacentHTML('beforeend', html);
		}	
	}
	// update buget items after removing
	function updateAfter(objType){
		var html, incList, expList, itemPer;
			incList = document.querySelector(DOMstring.incomeList);
			expList = document.querySelector(DOMstring.expensesList);
		// clear UI items
			objType.forEach(function(e, i, arr){
				if(arr[i].act == 'inc'){
					while (incList.firstChild) {
	   					 incList.removeChild(incList.firstChild);
					}
				}else{
					while (expList.firstChild) {
		   				 expList.removeChild(expList.firstChild);
					}
				}
			});
		// update UI items
		objType.forEach(function(e, i, arr){
				if(arr[i].act == 'inc'){
					 html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
					 html = html.replace('%id%', arr[i].id);
					 html = html.replace('%description%', arr[i].description);
					 html = html.replace('%value%', arr[i].count);
					 incList.insertAdjacentHTML('beforeend', html);
				}else{				
					html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">%21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
					html = html.replace('%id%', arr[i].id);
					html = html.replace('%description%', arr[i].description);
					html = html.replace('%value%', arr[i].count);
					html = html.replace('%21%', arr[i].each);
					expList.insertAdjacentHTML('beforeend', html);
				}	
			});
	}
	return{
		getString: function (){
			return DOMstring;
		},
		viewUpdate: function(inc, exp, tot){
			update(inc, exp, tot);
		},
		itemUpdate: function(objType, objPer){
			return addItem(objType, objPer);
		},
		upAfter: function(objType){
			return updateAfter(objType)
		},
		clearFields: function(){
			var fields, fieldsArray;
			fields = document.querySelectorAll(DOMstring.description + ',' + DOMstring.count);
			fieldsArray = Array.prototype.slice.call(fields);
			fieldsArray.forEach(function(element){
				element.value = "";
			});
			fieldsArray[0].focus();
		},
		percentUpdate: function(element){
			 document.querySelector(DOMstring.percent).textContent = element;
		},
		setCurrentMonth: function(el){
			return setMonth(el);
		}
	}
})()

// Init budget controller

var budgetController = (function(model, UI){
	var str, data, budgetModel, budgetUI;
	 budgetModel = model;
	 budgetUI = UI;
	 str = budgetUI.getString();
	 // My short function to query some selector
	 var queryVal = function(str){
	 	return document.querySelector(str).value;
	 }
	 // PROJECT BEGIN 
	 document.querySelector(str.addButton).addEventListener('click', begin );
	 document.addEventListener('keypress', function(e){
	 	console.log(event.keyCode);
	 	if(event.keyCode == 32 || event.keyCode == 13){
	 		begin();
	 	}
	 });
	function begin(){
		console.log('start getting the value');
		// 1 Get the value and validate
		if (queryVal(str.description) !== "" && isNaN(queryVal(str.description)) && queryVal(str.count) !== ""){
			budgetModel.setItem(document.querySelector(str.description).value, 
							parseInt(document.querySelector(str.count).value),
							document.querySelector(str.action).value,
							budgetModel.itemId());
		// Clear the fields of inputs UI
			budgetUI.clearFields();
		// 2 Set the data
			budgetModel.toCalc();
		// 3 Calculate the values
		 	budgetUI.viewUpdate(budgetModel.income(), budgetModel.expenses(), budgetModel.total());
		 	budgetUI.setCurrentMonth(budgetModel.getMonth());
			budgetModel.setEachPercent();
	 	// 4 Refresh the view
	 		budgetUI.itemUpdate(budgetModel.test());
 		// 5 Update percantage
 			budgetUI.percentUpdate(budgetModel.getPersentage());
		}else{
			console.log('Please, insert required value');
		}
		 // Удаление элементов

		document.querySelector(str.itemDel).addEventListener('click', function(e){
			var target, chosen;
			target = e.target;
			if(target.parentNode.classList.contains('item__delete--btn')){
				chosen = target.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
				console.log(chosen);
				// delitetion budget items
				budgetModel.itemDel(chosen);
				console.log('haile');
				// Clear the fields of inputs UI
				budgetUI.clearFields();
			// 3 Calculate the values
				budgetModel.upDate();
			 	budgetUI.viewUpdate(budgetModel.income(), budgetModel.expenses(), budgetModel.total());
				//budgetModel.setEachPercent();
		 	// 4 Refresh the view
		 		budgetUI.upAfter(budgetModel.test());
	 		// 5 Update percantage
	 			budgetUI.percentUpdate(budgetModel.getPersentage());
			}
		});
	}
})(budgetModel, budgetUI)
// Init budget model 

var budgetModel = (function(){
	var data, dataObject, budgetUI, DOMstring; 
	 data = [];
	function Values(description, count, act){

		this.description = description;
		this.count = count;
		this.act = act;

	}
	
	// Object where sit all current data
	var currentData = {
		income: 0,
		expenses: 0,
		total: function(){
			return this.income - this.expenses;
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
		}
	}
	// return public methods
	return {
		setItem: function(d, c, a){
			data.push(new Values(d, c, a));
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
		total: '.budget__value'
	}
	// update the buget UI
	function update(inc, exp, tot){
		document.querySelector(DOMstring.income).textContent = inc;
		document.querySelector(DOMstring.expense).textContent = exp;
		document.querySelector(DOMstring.total).textContent = tot;
	}
	return{
		getString: function (){
			return DOMstring;
		},
		viewUpdate: function(inc, exp, tot){
			update(inc, exp, tot);
		}
	}
})()

// Init budget controller

var budgetController = (function(model, UI){
	var str, budgetModel, budgetUI;
	 budgetModel = model;
	 budgetUI = UI;
	 str = budgetUI.getString();
	 // My short function to query some selector
	 var queryVal = function(str){
	 	return document.querySelector(str).value;
	 }

	document.querySelector(str.addButton).addEventListener('click', function(){
		console.log('start getting the value');

		// 1 Get the value and validate
		if (queryVal(str.description) !== "" && isNaN(queryVal(str.description)) && queryVal(str.count) !== ""){
			budgetModel.setItem(document.querySelector(str.description).value, 
							parseInt(document.querySelector(str.count).value),
							document.querySelector(str.action).value);
		}else{
			console.log('Please, insert required value');
		}
		// 2 Set the data
			budgetModel.toCalc();
		// 3 Calculate the values
		// 4 Refresh the view
		 	budgetUI.viewUpdate(budgetModel.income(), budgetModel.expenses(), budgetModel.total());
	});

})(budgetModel, budgetUI)
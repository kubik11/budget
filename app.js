// Init budget model 

var budgetModel = (function(){
	var data, dataObject; 
	 data = [];

	// dataObject = {
	// 
	// }
	function Values(description, count, act){

		this.description = description;
		this.count = count;
		this.act = act;

	}

	return {
		setItem: function(d, c, a){
			data.push(new Values(d, c, a));
		},
		test: function(){
			return data;
		}
	}

})()


// Init buget UI

var budgetUI = (function(){

	var DOMstring  = {
		addButton: '.add__btn',
		action: '.add__type',
		description: '.add__description',
		count: '.add__value'
	}
	return{
		getString: function (){
			return DOMstring;
		}
	}
})()

// Init budget controller

var budgetController = (function(model, UI){
	var str, budgetModel, budgetUI;
	 budgetModel = model;
	 budgetUI = UI;
	 str = budgetUI.getString();

	document.querySelector(str.addButton).addEventListener('click', function(){
		console.log('start getting the value');
		budgetModel.setItem(document.querySelector(str.description).value, 
							document.querySelector(str.count).value,
							document.querySelector(str.action).value);
	});

})(budgetModel, budgetUI)
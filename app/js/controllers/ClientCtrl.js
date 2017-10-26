'use strict';

angular
.module('app')
.controller('ClientCtrl',  function(ClientService, socket) { //socket

	const vm = this;
	vm.status = 'login';//open

// --------------------------------------------------
vm.login = function(user_data){
	vm.status = 'landing';
	vm.user = {};

	vm.accountForm.$setPristine();
	ClientService.postClient(user_data).then( res => {
				vm.user = res.data;

				vm.status = 'open'; // = res.status;
			});
}
// --------------------------------------------------

vm.addMoney = function() {
	vm.user.balance += 100;

	ClientService.updateBalance(vm.user);
}

vm.buyDish = function() {
	vm.user.balance -= vm.dish.price;
	vm.user.orders.push( {id: vm.dish.id, title: vm.dish.title, status: "Ordered"} );

	ClientService.updateBalance(vm.user);
	ClientService.newOrder(vm.user);
	//  выключаем вкладки
	$(".cl-full-grid").css("display", "none");
	$(".cl-all-menu").css("display", "none");
}

// --------------------------------------------------

vm.popUpMenu = function(status) {
	if(status){
		ClientService.getMenu().then(res => {
			vm.menu = res.data;
			$(".cl-all-menu").css("display", "block");
		});
	}	else $(".cl-all-menu").css("display", "none");
}

// --------------------------------------------------

vm.popUpGrid = function(id_grid){

	if(!id_grid){
		$(".cl-full-grid").css("display", "none");
	} else {
		ClientService.getDish(id_grid).then(res => {
			vm.dish = res.data;

			vm.dish.ingredients = vm.dish.ingredients.join(', ');
			$(".cl-full-grid").css("display", "block");

			if(vm.user.balance < vm.dish.price){
				$(".cl-full-grid-notEnough").css("display", "block");
				vm.purchasingPower = "disabled";
			} else {
				$(".cl-full-grid-notEnough").css("display", "none");
				vm.purchasingPower = "orange lighten-1";
			}
		});
	}
};


// --------------------------------------------------
vm.whatIsColor = function(status) {
	if((status === "Ordered") || (status === "Cooking") || (status === "On the way")) return "orange-status";
	else if(status === "Problems") return "red-status";
	else if(status === "Arrived") return "green-status";
	else return "";
};
});


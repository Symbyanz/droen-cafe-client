'use strict';

angular
.module('app')
.controller('KitchenCtrl', function(KitchenService, socket) {

	const vm = this;
	var vm.orders = {};
	// вызывается при инициализации входа в ../kitchen 
	vm.login = function(){
		KitchenService.getOrders().then( res => {	vm.orders = res.data; });
	}


	vm.cooking = function(order_id) { 
		// перебираем массив и изменяем значение в нем после передаем этот заказ в сервис
		vm.orders.forEach(function(item, i) {
			if(item._id === order_id) {	
				vm.orders[i].status = "Cooking";
				KitchenService.cookingOrder(item); }
			});
	}

	vm.ready = function(order_id) { 
		// аналогично.. по сути можно было и в одну объединить
		vm.orders.forEach(function(item, i) {
			if(item._id === order_id) {	
				KitchenService.readyOrder(item);
				vm.orders.splice(i, 1); }
			});
	}

	socket.on("addKitchenOrder", function(order) {
		vm.orders.push(order);
	})

});
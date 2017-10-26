'use strict';

angular
.module('app')
.controller('KitchenCtrl', function(socket) {

	const vm = this;

	socket.on('updateStatus', function(data) {
		console.log(data);
	});

});
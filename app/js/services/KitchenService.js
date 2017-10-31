angular
.module('app')
.factory('KitchenService', function($http, socket) {

    return {
        getOrders() {
            return $http.get('http://192.168.0.121:3000/orders'); // url server.. https://infinite-lowlands-52249.herokuapp.com/orders
        },

        cookingOrder(order){ 
        	return socket.emit("cookingOrder", {client_email: order.client_email, _id: order._id, status: order.status});
        },

        readyOrder(order){ 
        	return socket.emit("readyOrder", {client_email: order.client_email, _id: order._id, status: "On the way"}); 
        }
    }

}

);

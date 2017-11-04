angular
.module('app')
.factory('ClientService', function($http, socket) {

    return {

        postClient(user_data) {
            return $http({
                method: 'POST',
                        url: 'https://infinite-lowlands-52249.herokuapp.com/users', // url server..  http://192.168.0.121:3000/users
                        data: user_data
                    })
        },
        getMenu(){
            return $http.get('https://infinite-lowlands-52249.herokuapp.com/menu'); // url server.. http://192.168.0.121:3000/menu
        },
        getDish(dish_id){
            return $http.get('https://infinite-lowlands-52249.herokuapp.com/menu/' + dish_id); // url server.. http://192.168.0.121:3000/menu/
        },

        updateBalance(user){ return socket.emit("updateUserBalance", {email: user.email, balance: user.balance}); },
        
        newOrder(user){ return socket.emit("newUserOrder", {email: user.email, order: user.orders[user.orders.length-1]}); }

    }

}

);

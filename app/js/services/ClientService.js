angular
.module('app')
.factory('ClientService', function($http, socket) {

    return {

        postClient(user_data) {
            return $http({
                method: 'POST',
                        url: 'https://infinite-lowlands-52249.herokuapp.com/users', //http://192.168.0.121:3000/users/ url server.. 
                        data: user_data
                    })
        },
        getMenu(){
            return $http.get('https://infinite-lowlands-52249.herokuapp.com/menu');
        },
        getDish(dish_id){
            return $http.get('https://infinite-lowlands-52249.herokuapp.com/menu/' + dish_id);
        },

        updateBalance(user){
            return socket.emit("updateUserBalance", {_id: user._id, balance: user.balance});
        },
        newOrder(user){;
            return socket.emit("newUserOrder", {_id: user._id, order: user.orders[user.orders.length-1]});
        }
    }

}

);

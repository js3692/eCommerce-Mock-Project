app.factory('Order', function(DS) {
    var Order = DS.defineResource({
        name: 'order'
    }); 
    Order.byUser = function(id) {
        console.log(id);
        return this.findAll()
            .then(function(orders) {
                return orders.filter(function(order) {
                    return id === order.user;
                });
            });
        
    };
    return Order;
    
}).run(function(Order) {});
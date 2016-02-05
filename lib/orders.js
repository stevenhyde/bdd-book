// will contain an order object, that is being tested

'use strict';

function orderSystem(orderDAO){
    return new Order(orderDAO);
}

var Order = function(tmpDAO){
    this.DAO = tmpDAO;
}

Order.prototype.display = function(orderName){
    let subtotal = 0;
    return {
        items : this.DAO.byId(orderName),
        totalPrice : subtotal,
        actions : [{
            action: 'append-beverage',
            target: orderName,
            parameters: {
                beverageRef: null,
                quantity: 0
            }
        }]
    }
}

module.exports = orderSystem;
// will contain an order object, that is being tested

'use strict';

function orderSystem(orderDAO){
    return new Order(orderDAO);
}

var Order = function(tmpDAO){
    this.DAO = tmpDAO;
}

Order.prototype.display = function(orderId, callback){
    let subtotal = 0;
    console.log("Passing here");
    this.DAO.byId(orderId, function(err, res){
        // after receiving the results from DAO - currently simulated by sinon.stub, I'll just continue with processing through the callback passed
        callback(err , {
            items : res,
                totalPrice : subtotal,
                actions : [{
                    action: 'append-beverage',
                    target: orderId,
                    parameters: {
                        beverageRef: null,
                        quantity: 0
                    }
                }]
                
            });
    });
}

module.exports = orderSystem;
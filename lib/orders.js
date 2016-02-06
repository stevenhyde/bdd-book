// will contain an order object, that is being tested

'use strict';

function orderSystem(orderDAO){
    return new Order(orderDAO);
}

var Order = function(tmpDAO){
    this.DAO = tmpDAO;
}

Order.prototype.display = function(orderId){
    let subtotal = 0;
    // console.log("Passing here");
    var promFn = (resolve, reject) => {
        this.DAO.byId(orderId, function(err, res){
            // after receiving the results from DAO - currently simulated by sinon.stub, I'll just continue with processing through the callback passed
            if(err){
                reject(err);
            }
            else{
                let tmpActions = [{
                        action: 'append-beverage',
                        target: orderId,
                        parameters: {
                            beverageRef: null,
                            quantity: 0
                        }
                    }];
                    
                for(let resItem of res){
                    subtotal += resItem.beverage.price * resItem.quantity;
                    // add relevant actions 
                    tmpActions.push({'action' : 'remove-beverage', target : orderId , parameters : {
                                            beverageRef : resItem.beverage.id,
                                        }});
                    tmpActions.push({'action' : 'edit-beverage', target : orderId , parameters : {
                                            beverageRef : resItem.beverage.id,
                                            newQuantity : resItem.quantity,
                                        }});
                }
                if(subtotal > 0){
                    tmpActions.push({'action' : 'place-order', target : orderId })
                }
                
                resolve({
                    items : res,
                    totalPrice : subtotal,
                    actions : tmpActions
                    
                });
            }
        });
        // console.log("Got into the promise");
    };
    return new Promise(promFn);
}

module.exports = orderSystem;
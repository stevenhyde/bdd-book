'use strict';

let beverages = require("./beverages"),
    counter = 0;
    
function asOrderItem(itemExample){
    return {
        beverage : beverages[itemExample.beverage](),
        quantity : itemExample.quantity,
    }
}


module.exports= {
    empty : function () {
        return {
            id : "<empty order>",
            data : []
        };
    },
    withItems : function(itemExamples){
        ++counter;
        return {
            id : `<non-empty order ${counter}>`,
            data : itemExamples.map(asOrderItem),
        };
    },
    actionsFor : function(order){
        return {
            removeItem : (idx) => {
                var item = order.data[idx];
                return {'action' : 'remove-beverage', 
                        target : order.id , parameters : {
                                            beverageRef : item.beverage.id,
                                        }}
            },
            editItemQuantity : (idx) => {
                var item = order.data[idx];
                return {'action' : 'edit-beverage', 
                        target : order.id , parameters : {
                                            beverageRef : item.beverage.id,
                                            newQuantity : item.quantity
                                        }}
            },
            appendItem : () => {
                return {'action' : 'append-beverage', 
                        target : order.id , parameters : {
                                            beverageRef : null,
                                            quantity : 0
                                        }}
            },
            place : () => {
                return {'action' : 'place-order', target : order.id }
            }
        }
    }
}

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
    }
}

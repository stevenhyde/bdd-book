// will contain an order object, that is being tested

function orderSystem(orderDAO){
    return new Order(orderDAO);
}

var Order = function(tmpDAO){
    this.DAO = tmpDAO;
}

Order.prototype.display = function(str){
    this.display = str;
}

module.exports = orderSystem;
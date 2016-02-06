'use strict';

let chai = require('chai'), expect = chai.expect, sinon = require("sinon");

let newStorage = require("./support/storageDouble");

chai.use(require("chai-as-promised"));

let orderSystemWith = require("../lib/orders"),
    orderFactory = require("./support/orders"),
    beverages = require("./support/beverages");

/* global context */
// the feature name should follow the format <ROLE> _ <ACTION> _ <ENTITY>
describe('Customer displays order', function() {
    beforeEach(function() {
        this.orderStorage = newStorage();
        this.orderSystem = orderSystemWith(this.orderStorage.dao());
    });
    // now add some scenarios
    context("Given that the order is empty", function() {
        let resultPromise, order;
        beforeEach(function() {
            order = this.order = this.orderStorage.alreadyContains(orderFactory.empty());
            resultPromise = this.orderSystem.display(this.order.id);
        });
        
        it('will show no order items', function(){
            // in each of the tests, we have to return 
            return expect(resultPromise).to.eventually.have.property('items').that.is.empty;
        });
        
        it('will show 0 as the total price', function(){
            return expect(resultPromise).to.eventually.have.property('totalPrice').that.is.equal(0);
        });
        
        it('will only be possible to add a beverage', function(){
            return expect(resultPromise).to.eventually.have.property('actions').that.is.deep.equal([{
                    action: 'append-beverage',
                    target: order.id,
                    parameters: {
                        beverageRef: null,
                        quantity: 0
                    }
                  }
               ]);
        }); // this sums up the test cases above into one general case
    });
    
    context("Given that the order contains beverages", () => {
        let resultPromise, order;
        beforeEach(function() {

            order = this.order = this.orderStorage.alreadyContains( orderFactory.withItems([
                                       { beverage : 'expresso' , quantity : 1},
                                       { beverage : 'mocaccino' , quantity : 2},
                                    ]
                                ));
            
            // returns promise now, so we will hook a then function to it
            resultPromise = this.orderSystem.display(this.order.id);
        });
        
        it('will show one item per beverage', function() {
            return expect(resultPromise).to.eventually.have.property('items').that.is.deep.equal(order.data);
        });
        it('will show the sum of the unit prices as total price', function(){
            return expect(resultPromise).to.eventually.have.property('totalPrice').that.is.equal(6.1);
        });
        it('will be possible to place the order', function() {
            return expect(resultPromise).to.eventually.have.property('actions')
                        .that.include({'action' : 'place-order', target : order.id });
        });
        it('will be possible to add a bverage', function() {
            return expect(resultPromise).to.eventually.have.property('actions')
                        .that.include({'action' : 'append-beverage', 
                                        target : order.id,
                                        parameters : {
                                            beverageRef : null,
                                            quantity : 0,
                                        }});
        });
        it('will be possible to remove a beverage', function() {
            return expect(resultPromise).to.eventually.have.property('actions')
                        .that.include({'action' : 'remove-beverage', 
                                        target : order.id,
                                        parameters : {
                                            beverageRef : beverages.expresso().id,
                                        }})
                        .and.that.include({'action' : 'remove-beverage', 
                                        target : order.id,
                                        parameters : {
                                            beverageRef : beverages.mocaccino().id,
                                        }})
        });
        it('will be possible to change the quantity of the beverage', function() {
            return expect(resultPromise).to.eventually.have.property('actions')
                        .that.include({'action' : 'edit-beverage', 
                                        target : order.id,
                                        parameters : {
                                            beverageRef : beverages.expresso().id,
                                            newQuantity : 1,
                                        }})
                        .and.that.include({'action' : 'edit-beverage', 
                                        target : order.id,
                                        parameters : {
                                            beverageRef : beverages.mocaccino().id,
                                            newQuantity : 2,
                                        }})
        });
    });
    
    // the order can have messages, that it might show to the user
    context('Given that the order has pending messages', () => {
        it('will show the pending messages');
        it('there will be no more pending messages');
    });
    
});


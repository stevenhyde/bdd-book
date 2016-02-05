'use strict';

let chai = require('chai'), expect = chai.expect, sinon = require("sinon");

let orderSystemWith = require("../lib/orders");

/* global context */
// the feature name should follow the format <ROLE> _ <ACTION> _ <ENTITY>
describe('Customer displays order', function() {
    beforeEach(function() {
        this.orderDAO = {
            byId : sinon.stub(),
        },
        this.orderSystem = orderSystemWith(this.orderDAO);
    });
    // now add some scenarios
    context("Given that the order is empty", function() {
        beforeEach(function() {
            this.orderId = 'some empty order id';
            this.orderDAO.byId.withArgs(this.orderId).returns([]);
            this.result = this.orderSystem.display('some empty order id');
        });
        it('will show no order items', function(){
            expect(this.result).to.have.property('items').that.is.empty;
        });
        it('will show 0 as the total price', function(){
            expect(this.result).to.have.property('totalPrice').that.is.equal(0);
        });
        // it('will not be possible to place the order');
        // it('will be possible to add a bverage');
        // it('will not be possible to remove a beverage');
        // it('will not be possible to change the quantity of the beverage');
        it('will only be possible to add a beverage', function(){
            expect(this.result).to.have.property('actions').that.is.deep.equal([{
                    action: 'append-beverage',
                    target: this.orderId,
                    parameters: {
                        beverageRef: null,
                        quantity: 0
                    }
                }
            ]);
        }); // this sums up the test cases above into one general case
    });
    
    context("Given that the order contains beverages", () => {
        it('will show one item per beverage');
        it('will show the sum of the unit prices as total price');
        it('will be possible to place the order');
        it('will be possible to add a bverage');
        it('will be possible to remove a beverage');
        it('will be possible to change the quantity of the beverage');
    });
    
    // the order can have messages, that it might show to the user
    context('Given that the order has pending messages', () => {
        it('will show the pending messages');
        it('there will be no more pending messages');
    });
    
});


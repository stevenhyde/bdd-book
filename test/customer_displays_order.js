'use strict';

let chai = require('chai'), expect = chai.expect, sinon = require("sinon");

/* global context */
// the feature name should follow the format <ROLE> _ <ACTION> _ <ENTITY>
describe('Customer displays order', () => {
    // now add some scenarios
    context("Given that the order is empty", () => {
        it('will show no order items');
        it('will show 0 as the total price');
        // it('will not be possible to place the order');
        // it('will be possible to add a bverage');
        // it('will not be possible to remove a beverage');
        // it('will not be possible to change the quantity of the beverage');
        it('will only be possible to add a beverage'); // this sums up the test cases above into one general case
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


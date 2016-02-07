var assert = require("assert");
var chai = require("chai"), expect = chai.expect;
var validator = require("../lib/validator");

/* global context */

function expectedToIncludeErrorWhenInvalid(example){
    it('like ' + example.number, function(){
        expect(validator(example.number)).to.include(example.error);
    });
}

describe('A validator', function(){
    context('with standard set of rules', function() {
        it("will return no errors for strictly positive numbers", function(){
            // var validator = new Validator();
            expect(validator(7)).to.be.empty; 
            // assert.deepEqual(validator(0), ['error.nonpositive']);
        });
        
        it('will return one error for each rule the number violates',
            function() {
                expect(validator(15)).to.be.deep.equal(['error.three', 'error.five']);
        });
    
        describe("will return error.nonpositive for not strictly positive numbers: ", function(){
    
            // expectedToIncludeErrorWhenInvalid(0, 'error.nonpositive');
            // expectedToIncludeErrorWhenInvalid(-2, 'error.nonpositive');
            
            [
                {number : 0, error : 'error.nonpositive' },
                {number : -2, error : 'error.nonpositive' },
            ].forEach(expectedToIncludeErrorWhenInvalid);
        });    
        
        describe("will return error.three for numbers divisible by 3: ", function(){
    
            // expectedToIncludeErrorWhenInvalid(3, 'error.three');
            // expectedToIncludeErrorWhenInvalid(15, 'error.three');
            [
                {number : 3, error : 'error.three' },
                {number : 15, error : 'error.three' },
            ].forEach(expectedToIncludeErrorWhenInvalid);
            
        });    
        
        describe("will return error.five for numbers divisible by 5: ", function(){
    
            // expectedToIncludeErrorWhenInvalid(5, 'error.five');
            // expectedToIncludeErrorWhenInvalid(15, 'error.five');
            
            [
                {number : 5, error : 'error.five' },
                {number : 15, error : 'error.five' },
            ].forEach(expectedToIncludeErrorWhenInvalid);
            
        });
    });
    
    context('with different set of rules', function() {
        it("will return no errors for strictly positive numbers", function(){
            // var validator = new Validator();
            expect(validator(7)).to.be.empty; 
            // assert.deepEqual(validator(0), ['error.nonpositive']);
        });
        
        it('will return one error for each rule the number violates',
            function() {
                expect(validator(15)).to.be.deep.equal(['error.three', 'error.five']);
        });
    
        describe("will return error.nonpositive for not strictly positive numbers: ", function(){
    
            // expectedToIncludeErrorWhenInvalid(0, 'error.nonpositive');
            // expectedToIncludeErrorWhenInvalid(-2, 'error.nonpositive');
            
            [
                {number : 0, error : 'error.nonpositive' },
                {number : -2, error : 'error.nonpositive' },
            ].forEach(expectedToIncludeErrorWhenInvalid);
        });
        
        describe("will return error.three for numbers divisible by 3: ", function(){
    
            // expectedToIncludeErrorWhenInvalid(3, 'error.three');
            // expectedToIncludeErrorWhenInvalid(15, 'error.three');
            [
                {number : 3, error : 'error.three' },
                {number : 15, error : 'error.three' },
            ].forEach(expectedToIncludeErrorWhenInvalid);
            
        });    
        
        describe("will return error.five for numbers divisible by 5: ", function(){
    
            // expectedToIncludeErrorWhenInvalid(5, 'error.five');
            // expectedToIncludeErrorWhenInvalid(15, 'error.five');
            
            [
                {number : 5, error : 'error.five' },
                {number : 15, error : 'error.five' },
            ].forEach(expectedToIncludeErrorWhenInvalid);
            
        });
    });    
});
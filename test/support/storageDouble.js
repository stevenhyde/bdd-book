'use strict';

const sinon = require("sinon");

module.exports = function () {
    let dao = { byId : sinon.stub() },
        storage = {};
        
    storage.dao = function(){
        return dao;
    }
    
    storage.alreadyContains = function(entity){
        let data = entity.data;
        dao.byId.withArgs(entity.id)
            .callsArgWithAsync(1, null, data);
        return entity;
    };
    
    return storage;
}
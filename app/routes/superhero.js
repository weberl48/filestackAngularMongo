var mongoose  = require('mongoose');
var Superhero = require('../models/superhero');


//routes

module.exports = function() {
  return {
    getAll: function (req,res) {
      var query = Superhero.find({});
      query.exec(function(err, superheros){
        if (err) res.send(err);
        res.json(superheros);
      });
    },
    post: function(req,res) {
      var newSuperhero = new Superhero(req.body);

      newSuperhero.save(function(err){
        if(err) res.send(err)
        res.json(req.body)
      });
    },

    getOne: function(req,res){
      Superhero.findById(req.params.id, function(err, superhero){
        if(err) res.send(err);
        res.json(superhero);
      });
    }
  }
}
//getAll returns all superheros stored in the db
//post storing newly created superheros
//getOne returns a specific superhero with assosiated ID

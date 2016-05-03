//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Defining the schema
var SuperheroSchema = new Schema({
    name: {type: String, required: true},
    gender: {type: String, required: true},
    superPowers: {type: String, required: true},
    picture: {type: Schema.Types.Mixed, required: true},
    morePictures: Schema.Types.Mixed, // this is not required
    createdAt: {type: Date, default: Date.now},
});
// setting the created at paramater equal to the current time
SuperheroSchema.pre('save', function(next){
  now = new Date();
  if (!this.createAt) {
    this.createdAt = now;

  }
  next();
})
// exporting the schema for use
module.exports = mongoose.model('superhero',  SuperheroSchema);

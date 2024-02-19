const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title: {type: String},
    text: {type: String},
    image: {type: String, required: true},
    type: {type: String,default:"main"},
})
Schema.virtual("imageUrl").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})
module.exports = {
    SliderModel: mongoose.model("slider",Schema)
}
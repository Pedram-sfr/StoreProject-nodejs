const { default: mongoose } = require("mongoose");
const category = require("../router/admin/category");
const { schema } = require("@hapi/joi/lib/compile");

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId,ref: "category", default: undefined},
},{
    id: false,
    versionKey: false,
    toJSON:{
        virtuals: true
    }
})
Schema.virtual("children",{
    ref: "category",
    localField: "_id",
    foreignField: "parent",
})
function aotuPopulate(next){
    this.populate([{path: "children",select: {__v: 0}}])
    next()
}
Schema.pre("findOne",aotuPopulate).pre("find",aotuPopulate)
module.exports = {
    CategoryModel: mongoose.model("category",Schema)
}
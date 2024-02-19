const { default: mongoose } = require("mongoose");

const RoleSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    permiissions: {type: [mongoose.Types.ObjectId], ref: "permissions", default: []},
},{
    toJSON:{
        virtuals: true
    }
});

module.exports={
    RoleModel : mongoose.model("role",RoleSchema)
}
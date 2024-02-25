const { default: mongoose } = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String, default: ""},
},{
    toJSON:{
        virtuals: true
    }
});

module.exports={
    PermissionModel : mongoose.model("permission",PermissionSchema)
}
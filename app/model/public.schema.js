const { default: mongoose } = require("mongoose");
const AnswerSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId,ref:"user", required: true},
    comment: {type: String, required: true},
    show: {type: Boolean,required: true, default: false},
    openToComment: {type: Boolean,required: true, default: false},
},{
    timestamps: true
})
const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId,ref:"user", required: true},
    comment: {type: String, required: true},
    show: {type: Boolean,required: true, default: false},
    openToComment: {type: Boolean,required: true, default: true},
    answers: {type: [AnswerSchema],default: []},
},{
    timestamps: true
})

module.exports = {
    CommentSchema
}
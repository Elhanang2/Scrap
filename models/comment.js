var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    name: {
       type: String
    //    required: true
    },
    comment: String,
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
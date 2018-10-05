var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TopstorySchema= new Schema({
    title: {
        type: String,
        requied: true
    },
    imagelink: {
        type: String,
        required: true
    },
    titlelink: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }

});

var Topstories = mongoose.model("Topstories",TopstorySchema);
module.exports = Topstories;
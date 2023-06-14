import mongoose from "mongoose";


//TODO: manage more than one images
const PostSchema = new mongoose.Schema({
  Title: {
    type: String,
    index: true
  },
  Author: {
    type: String
  },
  Tags:{
    type:[String],
    index: true
  },
  Likes:[],
  Saves:[],
  Content: {
    type: String
  },
  CoverImage:{
    type: String 
  },
  PublishedDate: {
    type: Date,
    default: new Date('2022-10-12')
  },
  comments:[]
},{timestamps: true});

PostSchema.index({Content:'text', Title:'text', Tags:'text'});

var Postmodel = new mongoose.model('Post', PostSchema);
export default Postmodel;

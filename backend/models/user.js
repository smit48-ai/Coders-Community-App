import mongoose from "mongoose";

// TODO:Add validation and other fields
//TODO:Add emailid and its validation
const UserProfileSchema=new mongoose.Schema(
    {
        emailid :{
            type: String
        },
        isEmailVerified:{
            type:Boolean,
            default:false
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        Password: {
            type: String,
            required: true,
            unique: true,
        },
        Followers: [],
        Following: [],
        Interests : {
           type: Array,
           default:[]
        },
        Experience : {
            type: Array,
            default:[]
        },
        Projects : {
            type: Array,
            default: []
        },
        ProfilePicture:{
            type: String,
            default:""
        },
        CoverPicture:{
            type: String,
            default:""
        },
        Description:{
            type: String,
            default:""
        }
    },
    {timestamps: true}
)

const Usermodel = mongoose.model('user',UserProfileSchema);
export default Usermodel;

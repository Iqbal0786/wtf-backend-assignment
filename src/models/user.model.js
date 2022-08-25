const mongoose= require("mongoose");
const  bcrypt = require('bcryptjs');
const nanoid= require("nanoid")

// -id (primary key)
// -uid (13-character auto-generated alphanumeric;
// -first_name,
// -last_name,
// -email,
// -mobile
// -password (hash)
// -role (admin/member/trainer)
// -status(active/inactive);


const userSchema= new mongoose.Schema({
    id:{type:Number,required:true},
    uid:nanoid(13),
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    roles:{type:String,required:true},
    status:{type:String,required:true},
},{
    versionKey:false,
    timestamps:true
})

// hashing the password before saving in db

userSchema.pre("save",function(next){
    // if the password is already hashed then just return
    if(!this.isModified("password")){
        return next();
    }
    const hash= bcrypt.hashSync(this.password,8);
    this.password=hash;
    return next();
    // else we do the hashing
})

// adding a method to check the password
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  

module.exports= mongoose.model("user",userSchema);
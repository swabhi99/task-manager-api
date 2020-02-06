const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

        name:{
            type:String,
            required: true,
            trim: true
        },
        age:{
            type:Number,
            validate(value){
                if(value<0){
                    throw new Error('Age must be positive')
                }
            },
            default:0
        },
        email:{
            type:String,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            },
            lowercase:true,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            minlength:7,
            trim:true,
            validate(value){
                if(value.includes('password')){
                    throw new Error('Password cannot contain "Password"')
                }
            },
        },
        tokens:[
            {
                token:{
                type:String,
                required:true
                }
            }
        ]
    })

    userSchema.methods.toJSON = function(){
       const user = this
       const userObject = user.toObject()
       
       delete userObject.password
       delete userObject.tokens
       return userObject
    }

   
userSchema.statics.findByCredentials = async (email,password)=>{
    

    
    const user = await User.findOne({email})

    if(!user){
        throw new Error ('unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('unable to login')
    }

    return(user)

}


userSchema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

userSchema.methods.generateAuthToken = async function(){

    const user = this

    const token = jwt.sign({_id:user._id.toString()},'fuckyou')
    
    user.tokens = user.tokens.concat({token})

    await user.save()

    return token
}


const User = mongoose.model('User',userSchema)

module.exports = User
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    verifyCode: { type: String},
    verifyCodeExpiresAt: { type: Date },
    isVerified:{ type: Boolean, default: false }, 
},{timestamps: true});


export default User = mongoose.models.User || mongoose.model('User', userSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    verifyLink: { type: String },
    verifyLinkExpiresAt: { type: Date },
    profilePicture:{ type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg' },
    // verifyCode: { type: String},
    // verifyCodeExpiresAt: { type: Date },
    isVerified:{ type: Boolean, default: false }, 
},{timestamps: true});


// export default User = mongoose.models.User || mongoose.model('User', userSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;


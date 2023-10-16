import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'recipes'}]
});

export const UserModel = mongoose.model('user', UserSchema); //? This means that in the database the schema created will be a table of name User.

//export default UserModel;
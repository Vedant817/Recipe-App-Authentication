import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../model/Recipes.js";
import { UserModel } from "../model/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

//? Getting all the recipes at the home page
router.get('/', async (req, res) => {
    try {
        const response = await RecipeModel.find({}); //? This will find all the recipes saved in the database.
        res.send(response);
    } catch (error) {
        res.json(error);
    }
})

router.post('/',verifyToken, async (res, req) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response)
    } catch (error) {
        res.json(error);
    }
})

//? Saving the recipe.
router.put('/',verifyToken, async (res, req) => {
    //* We are using UserId to know which know which user we are getting or saving recipes.
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe);
        await user.save()
        res.json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.json(error);
    }
})
//? Getting the saved Recipes by the ID
router.get('/savedRecipes/:userID', async (req, res) => {
    try {
        const user = UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (error) {
        res.send(error);
    }
})

router.get('/savedRecipes/:userID', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes }, //? Saved Recipes will be the set of the Array.
        });
        res.send(savedRecipes);
    }
    catch (error) {
        res.send(error)
    }
})

export { router as recipeRouter };
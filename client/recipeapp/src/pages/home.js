import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import {Cookies, useCookies} from 'react-cookie'

const Home = () => {
    const [recipes, setRecipe] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [,setCookies] = useCookies('access-token');
    const userID = useGetUserID();
    useEffect(() => { //! We can't directly make useEffect as an async function. In order to prevent it we define a function inside and make it an async function.
        const fetchRecipe = async () => {
            try {
                const response = await axios.get('http://localhost:4000/recipes');
                setRecipe(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes)
            } catch (error) {
                console.log(error);
            }
        };
        fetchRecipe();
        fetchSavedRecipe();
    }, [])
    //? Saving a Recipe
    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {
                recipeID,
                userID,
            }, {headers: {authorization: Cookies.access_token}});
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    }
    const isRecipeSaved = (id) => savedRecipes.includes(id);
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => {
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
                        </div>
                        <div className='instructions'>
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Home

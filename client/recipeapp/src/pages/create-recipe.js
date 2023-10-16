/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom'

const CreateRecipe = () => {
    const userID = useGetUserID(); //? Getting the userID of the user from the local storage so that the recipe is stored for a particular user.
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target; //? Getting the parameter by name and data changed as value
        setRecipe({ ...recipe, [name]: value }) //? Keeping the rest of the data in the recipe as same and updating the name field.
    };
    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({ ...recipe, ingredients });
    };
    const addIngredients = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    }
    const onSubmit = async (event) =>{
        event.preventDefault();
        try {
            await axios.post('http://localhost:4000/recipes',recipe);
            navigate('/')
            alert('Recipe Created')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='create-recipe'>
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' onChange={handleChange} />
                <label htmlFor='ingredients'>Ingredients</label>
                {recipe.ingredients.map((ingredient, index) => {
                    <input key={index} type='text' name='ingredient' value={ingredient} onChange={(event) => handleIngredientChange(event, index)}></input>
                })}
                <button onClick={addIngredients} type='button'>Add Ingredients</button>
                <label htmlFor='instructions'>Instructions</label>
                <textarea id='instructions' name='instruction' onChange={handleChange}></textarea>
                <label htmlFor='imageUrl'>Image URL</label>
                <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange} />
                <label htmlFor='cookingTime'>Cooking Time(Minutes)</label>
                <input type='number' id='cookingTime' name='cookingTime' onChange={handleChange} />
                <button type='submit'>Create-Recipe</button>
            </form>
        </div>
    )
}

export default CreateRecipe

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findGame } from '../redux/actions/boardGame';
import { setLiquorType } from '../redux/actions/liquorSearch'
import { storeCurrentDrink } from '../redux/actions/favoriteDrinkAction';
import '../Styles/PairingForm.css'
import { Link, useNavigate } from 'react-router-dom'

const PairingForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const games = useSelector(state => state.boardGame.allGamesData.games)
    const type = useSelector(state => state.liquorSearch.liquorSearchWord)

    const gameNames = games.map((game) => {
        return (
            <option key={game.id} value={game.name} />
        )
    })

    const findRandomDrink = (event) => {
        event.preventDefault()
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${type}`)
            .then(res => res.json())
                .then(data => {
                    let randomNum = Math.floor(Math.random() * data.drinks.length)
                    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data.drinks[randomNum].idDrink}`)
                        .then(res => res.json())
                            .then(data => dispatch(storeCurrentDrink(data.drinks[0])))
                                .then(navigate('/:id'))
                })
    }

    return (    
        <div className='loading-page-bottom'>
            <div className='circular-image'>
            <img src={require('../assets/games-drinks-friends.jpeg')} />
            </div>
            
            <form className='game-liquor-input'>
                <label htmlFor='game-choice' className='game-input'>
                    
                    <input className='game-dropdown' id='game-choice' placeholder='Choose Your Game!' list='games' onChange={(event) => dispatch(findGame(event.target.value))}/>
                        <datalist id='games'>
                            {gameNames}
                        </datalist>
                </label>
                <label htmlFor='liquor-choice' className='liquor-input'>
                    
                    <input className ='liquor-dropdown'list='liquors' id='liquor-choice' placeholder='Whatchya drinking?' onChange={(event) => dispatch(setLiquorType(event.target.value))}/>
                    <datalist id='liquors' >
                        <option value='Vodka' />
                        <option value='Gin' />
                        <option value='Rum' />
                        <option value='Whiskey' />
                        <option value='Bourbon' />
                        <option value='Tequila' />
                        <option value='Scotch' />
                        <option value='Non Alcoholic' />
                    </datalist>

                </label>
                <Link to='/:id'>
                    <button className='pair-button' onClick={(event) => findRandomDrink(event)}><span>Pair</span></button>
                </Link>
                
                <button className='favorites-button'>Favorites</button>
            </form>

        </div>
    )
}

export default PairingForm
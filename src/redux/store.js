import { createStore } from 'redux'
import { favoriteDrinksReducer } from './reducers/favoriteDrinkReducer'
import { addFavoriteDrink } from './actions/favoriteDrinkAction'

const store = createStore(favoriteDrinksReducer)

export default store

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(addFavoriteDrink('mojito'))
store.dispatch(addFavoriteDrink('natty light'))
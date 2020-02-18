
import {
    FETCH_EXERCISES,
    DELETE_EXERCISE,
    START_DELETE_EXERCISE,
    CREATE_EXERCISE,
    UPDATE_EXERCISE
} from '../actions/actionType';

const initialState = {
    exercises: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_EXERCISES:
            return {
                ...state,
                exercises: action.exercises,
                loading: false
            };
        case CREATE_EXERCISE:
            return {
                ...state,
                exercises: state.exercises.concat(action.exercise),
                loading: false
            };
         case UPDATE_EXERCISE:
             const filteredArray = [...state.exercises].filter(el => el._id !== action.exercise._id)
             filteredArray.push(action.exercise)
            return {
                ...state,
                exercises: filteredArray,
                loading: false
            };
           
        case DELETE_EXERCISE:
            return {
                ...state,
                exercises: state.exercises.filter(el => el._id !== action.id),
                loading: false
            };
          case START_DELETE_EXERCISE:
            return {
                ...state,
                loading: true
            };
        default :
            return state
        
    }
}

export default reducer;
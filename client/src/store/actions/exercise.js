import { 
    FETCH_EXERCISES,
    DELETE_EXERCISE,
    START_DELETE_EXERCISE,
    CREATE_EXERCISE,
    UPDATE_EXERCISE
 } from './actionType'
 import axios from 'axios';

 export const exercise = (exercises) => {
     return {
         type: FETCH_EXERCISES,
         exercises: exercises
     }
 }
export const fetchExercise = () => {
    return dispatch => {
         axios.get('http://localhost:5000/exercises')
        .then(res => dispatch(exercise(res.data)))
        
    }
}

export const createdExercise = (exercise) => {
    return {
        type: CREATE_EXERCISE,
        exercise: exercise
    }
}

export const createExercise = (exercise) => {
    return dispatch => {
    axios.post('http://localhost:5000/exercises/add', exercise)
    .then(res => {
        dispatch(createdExercise(res.data))
    })
    }
}

export const updatedExercise = (exercise) => {
    return {
        type: UPDATE_EXERCISE,
        exercise: exercise
    }
}

export  const updateExercise = (exercise, id) => {
    return dispatch => {
        axios.post(`http://localhost:5000/exercises/update/${id}`, exercise)
        .then(res => {
            dispatch(updatedExercise(res.data))
        })
    }
}

export const deleteStartExercise = () => {
    return {
         type: START_DELETE_EXERCISE
    }
   
}
export const deletedxercise = (id) => {
    return {
        type: DELETE_EXERCISE,
        id: id
    }
}


export const deleteExercise = id => {
    return dispatch => {
        dispatch(deleteStartExercise())
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => dispatch(deletedxercise(id)))
        
    }
   
}
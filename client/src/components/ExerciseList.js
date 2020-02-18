import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Spinner from './UI/Spinner';
import {connect} from 'react-redux';
import {fetchExercise, deleteExercise} from '../store/actions/index';

 class ExerciseList extends Component {
    componentDidMount(){
        this.props.onFetchExerciseData()
    }
    render() {
        let list = <Spinner/>;
        if(!this.props.loading){
            list = (<table className="table table-striped table-hover table-responsive-md">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Description</th>
                        <th scope="col">Duration</th>
                        <th scope="col">date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.exercises.map(exercise => (
                        <tr key={exercise._id}>
                            <td>{exercise.username}</td>
                            <td>{exercise.description.length >= 25 ? exercise.description.slice(0, 25) + '...' :  exercise.description}</td>
                            <td>{exercise.duration}</td>
                            <td>{new Date(exercise.date).toDateString()}</td>
                            <td>
                                <Link to={`/edit/${exercise._id}`}>edit</Link> | 
                                <a onClick={() => this.props.onDeleteExercise(exercise._id)} href="#"> delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>)
        }
        return (
            <div> 
                <h4 className="text-center display-5" style={{margin: "10px 0"}}>All Exercise List</h4>
                {list}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    exercises: state.exercises.exercises,
    loading: state.exercises.loading
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchExerciseData: () => dispatch(fetchExercise()),
        onDeleteExercise: (id) => dispatch(deleteExercise(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);
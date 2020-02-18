import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Spinner from './UI/Spinner';
import {connect} from 'react-redux'
import { updateExercise } from '../store/actions/index';

 class EditExercise extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
            loading: false
        }
    }

    componentDidMount(){
        this.setState({
            loading: true
        })
        axios.get(`/exercises/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                username: res.data.username,
                description: res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date),
                loading: false
            })
        })

        axios.get('/users')
        .then(res => {
            const users = []
            res.data.forEach(el => users.push({id: el._id, username: el.username}))
            this.setState({users: users})
        })
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration = (e) => {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }
        this.props.onUpdateExercise(exercise, this.props.match.params.id)
        this.props.history.push('/'); 
    }

    render() {
        let exercise = <Spinner/>
        if(!this.state.loading){
            exercise = (
                <>
                 <form onSubmit = {this.onSubmit} className="formElement">
                
                 <div className="form-group">
                     <label htmlFor="exampleFormControlSelect1">Select name</label>
                     <select 
                         className="form-control" 
                         id="exampleFormControlSelect1" 
                         ref="userInput"
                         required
                         value={this.state.username}
                         onChange={this.onChangeUsername}
                         >
                         {this.state.users.map(user => (
                             <option
                                 key={user.id}
                                 value={user.username}>
                                 {user.username}
                             </option>
                         ))}
                     </select>
                 </div>
     
                 <div className="form-group">
                     <label htmlFor="exampleFormControlTextarea1">Description</label>
                     <textarea 
                         className="form-control" 
                         id="exampleFormControlTextarea1" rows="3"
                         value={this.state.description}
                         onChange={this.onChangeDescription}>
                         
                     </textarea>
                 </div>
     
                 <div className="form-group">
                     <label htmlFor="exampleFormControlInput2">Duration in (Minutes)</label>
                     <input 
                         type="text"
                         className="form-control" 
                         id="exampleFormControlInput2" 
                         placeholder="duration"
                         value={this.state.duration}
                         onChange={this.onChangeDuration}/>
                 </div>
     
               
               
                 <div className="form-group">
                     <label htmlFor="exampleFormControlInput3">Date</label>
                     <br/>
                       <DatePicker
                       selected={this.state.date}
                       onChange={(date) => this.onChangeDate(date)}/>
                     
                 </div>
                 <button type="submit" className="btn btn-primary">Edit Exercise Log</button>
                 </form>
                </>
            )
        }
        return (
            <>
                <h4 className="text-center display-5" style={{margin: "10px 0"}}>Update Exercise Log</h4>
                {exercise}
            </>
        )
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateExercise: (exercise, id) =>  dispatch(updateExercise(exercise, id))
    }
}

export default connect(null,mapDispatchToProps)(EditExercise);
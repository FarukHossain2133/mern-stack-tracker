import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Spinner from './UI/Spinner';
import {connect} from 'react-redux';
import {createExercise} from '../store/actions/index';

class CreateExercise extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
            loading: false, 
        }
    }

    componentDidMount(){
        this.setState({
            loading: true
        })
        axios.get('http://localhost:5000/users')
        .then(res => {
            const users = []
            res.data.forEach(el => users.push({id: el._id, username: el.username}))
            this.setState({users: users, loading: false})
            
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
        this.props.onCreateExercise(exercise)
        // window.location = '/'; 
        this.props.history.push('/')
    }


    render() {
        let IsSubmitted = this.state.username && this.state.description && this.state.duration && this.state.date;

        let creatExercise = this.state.loading ? <Spinner/> : (
            <div className="createExercise">
          
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
                        <option value={null}>Select An User</option>
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
                <button type="submit" className="btn btn-primary" disabled = {!IsSubmitted}>Create Exercise Log</button>
                </form>
           </div>
        )
        return (
            <>
                <h4 className="text-center display-5" style={{margin: "10px 0"}}>Create new exercise</h4>
                {creatExercise}
            </>
            )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onCreateExercise: (exercise) => dispatch(createExercise(exercise))
    }
}


export default connect(null, mapDispatchToProps)(CreateExercise);
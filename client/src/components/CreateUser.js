import React, { Component } from 'react'
import axios from 'axios';
import Spinner from './UI/Spinner';
import './CreateUser.css';

export default class CreateUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            loading: false
           
        }
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const user = {
            username: this.state.username,
        }
       
        axios.post('/users/add', user)
            .then(res => {
                this.setState({username: '', loading: false})
            })
        
    }


    render() {
       let isSubmitted = this.state.username;

        let createUser = this.state.loading ? <Spinner/> :(
            <>
    
            <form onSubmit = {this.onSubmit} className="formElement">
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput2">Username</label>
                    <input 
                        type="text"
                        className="form-control" 
                        id="exampleFormControlInput2" 
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled = {!isSubmitted}>Submit</button>         
            </form>
           </>)
        return (
            <>
                <h4 className="text-center display-5" style={{margin: "10px 0"}}>Create new User</h4>
                {createUser}
            </>
        )
        
    }
}

import React, { Component } from 'react';
import axios from 'axios';

const initialUser = {
  username: '',
  password: '',
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: ''
    }
  }

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } })
  }

  submitHandler = (event) => {
    event.preventDefault();
    axios.post(`https://dad-jokes2019.herokuapp.com/users/user`, this.state.user)
      .then((res) => {
        // if (res.status === 201) {
        //   this.setState({
        //     message: 'Registration Successful',
        //     user: { ...initialUser },
        //   })
        //   this.props.history.push('/')
        // } else {
        //   throw new Error();
        // }
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/content')
      })
      .catch(err => {
        this.setState({
          message: 'Registration failed',
          user: { ...initialUser }
        })
      })
  }

  render() {
    return (
      <div className='login'>
        <form onSubmit={this.submitHandler}>
          <section>
            <h1>Welcome!<br/> Please register:</h1>
          </section>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={this.state.user.username}
            onChange={this.inputHandler}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            id='password'
            name='password'
            value={this.state.user.password}
            onChange={this.inputHandler}
          />
          <button className="login-btn" type='submit'>Submit</button>
        </form>
        {this.state.message
          ? (<h4>{this.state.message}</h4>)
          : undefined
        }
      </div>
    )
  }
} 

export default Register;
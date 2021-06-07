import React from 'react';
import './sign-in.styles.scss';
import FormInput from "../form-input/form-intput.component";
import CustomButton from "../custom-button/custom-button.component";

import {auth, signInWithGoogle} from "../../firebase/firebase.utils";



class SignIn extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {

        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: ''});
        } catch (error) {
            console.log(error);
        }
    };

   handleChange = (event) => {
       const {value, name} = event.target;

       this.setState({[name]: value});
       console.log(this.state);

    };


    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type="email"
                        value={this.state.email}
                        label='email'
                        handleChange={this.handleChange}
                        required/>
                        <br/>
                        <FormInput
                            name='password'
                            type="password"
                            value={this.state.password}
                            label='password'
                            handleChange={this.handleChange}
                            required/>
                            <br/>

                    <div className='buttons'>

                        <CustomButton type='submit'> Sign in </CustomButton>
                        <CustomButton
                            type='button'
                            onClick={signInWithGoogle}
                            isGoogleSignIn
                        >
                            Sign in with Gmail
                        </CustomButton>

                    </div>
                </form>
            </div>
        )
    }

}

export default SignIn;
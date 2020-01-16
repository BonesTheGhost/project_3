import React, { useState } from 'react';

import './UserAuth.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

const UserAuth = props => {
    //we create the initial state. We are either in 'login' mode or not, so:: isLoginMode=true/false, and then a variable for changing that mode on the fly.
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
        false
    );

    //we added our desired behavior function to our button down below! What do we want to do? We want to switch 'modes' from auth to singup. SO:: 'switchModeHandler'.
    //To switch a 'mode', we need to manage a 'mode'. So we need 'useState' (imported at the top).
    //The 'prevMode' function format here allows us to grab the previous state (and this is the correct syntax for doing that) and then invert it here.
    //We need to correctly update the behind-the-scenes form data when we switch the mode.
    //We have multiple state changes that happen 'synchronously' here; immediately AFTER one another, React will 'batch' them together and run them as one state update for us.
    //the '...formState.inputs' is necessary to allow for us to import our form fields and the uust overwrite the name, instead of trying to slam 'undefined' back down the component that doesn't account for values of 'undefined'
    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, 
            false
            );
        }
    setIsLoginMode(prevMode => !prevMode);
};

const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
};

return <Card className="authentication">
    <h2>Login Required</h2>
    <hr />
    <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
            <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name"
                onInput={inputHandler}
            />
        )}
        <Input
            element="input"
            id="email"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
        />
        <Input
            element="input"
            id="password"
            type="password"
            label="password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>

    </form>

    <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>

</Card>;
};

export default UserAuth;
import React from 'react';

import './UserAuth.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

const UserAuth = props => {
    const [formState, inputHandler] = useForm({
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

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
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
            <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
        </form>
    </Card>;
};

export default UserAuth;
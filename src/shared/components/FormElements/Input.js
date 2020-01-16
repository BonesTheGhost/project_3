import React, { useReducer } from 'react';
//useReducer allows you to use state in a component, and allows you to make a function call to update the component. Alternatively to 'useState()' this allows us to use logic etc. so better for components with joined state.
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: true
            }
            return {};
        default:
            return state;
    }
}

//useReducer takes a second optional argument that is initial state we can setup. So we set it to an empty string and isValid is false. It returns an array with two elements, so we use array destructuring to store the elements as new constants.
const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, { value: '', isValid: false });

    const changedHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value});
    };

    const element = props.element === 'input' ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changedHandler}
            value={inputState.value}
        />
    ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changedHandler}
                value={inputState.value}
            />
        );


//Here, in the form control after element, we are checking if inputState is NOT valid so we can kick out some error text. Towards the top, we are again checking if inputState is invalid and if it is we are adding an 'invalid' class. It will only become valid after we type a single character since initially that is what it is hardcoded to do.
    return (
        <div className={`form-control ${!inputState.isValid &&
        'form-control--invalid'}`}>
            <label
                htmlFor={props.id}
            >
                {props.label}</label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
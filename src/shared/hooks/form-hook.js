import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    //whenever the component NewPlace^ function is run, a NEW titleInputHandler function object is created. The function would then trigger the 'onInput' which would then trigger the useEffect logic which would re-call the function, etc. Its an infinite loop. Thus, we need a callback function!!
    //This is designed to manage all input and validation for our entire form since we can easily add fields and inputs to our form!
    //When we call this logic from another component, the content inside of the external function will update as well, hence the value of taking this logic out of 'NewPlace' and seperating it here.
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, [dispatch]);

    return [formState, inputHandler];
};


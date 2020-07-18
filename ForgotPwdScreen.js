import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import Input from '../../components/UI/Input';
import * as authActions from '../../store/actions/auth';

import HeaderButton from '../../components/UI/HeaderButton';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {

    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const ForgotPwdScreen = props => {
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: ''
        },
        inputValidities: {
            email: false,
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const forgotHandler = async () => {
        if (!formState.formIsValid) {
            Alert.alert('Incorrect Email!', 'Please enter a valid email address.', [
                { text: 'Okay' }
            ]);
            return;
        }
        action = authActions.forgotPassword(
            formState.inputValues.email
        );
        setError(null);
        try {
            await dispatch(action);
            Alert.alert('Reset link sent!', 'Please check email.', [
                { text: 'Okay' }
            ]);
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }

        //props.navigation.goBack();

    };

    return (
        <View style={styles.centered}>
            <Input
                id="email"
                label="Email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue=""
            />
            <Button
                color={Colors.secondary}
                title={"Submit"}
                onPress={forgotHandler}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    titles: {
        margin: 30,
        fontFamily: 'open-sans-bold',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 20
    }
});

export default ForgotPwdScreen;
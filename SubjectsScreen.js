import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Platform,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import HeaderButton from '../../components/UI/HeaderButton';
import * as subjectsActions from '../../store/actions/subjects';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

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

const SubjectsScreen = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const subId = props.navigation.getParam('subjectId');
    const editedProduct = useSelector(state =>
        state.subjects.userSubjects.find(subj => subj.subject === subId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            subject: editedProduct ? editedProduct.subject : '',
        },
        inputValidities: {
            subject: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            if (editedProduct) {
                await dispatch(
                    subjectsActions.updateSubject(
                        formState.inputValues.subject,
                    )
                );
            } else {
                await dispatch(
                    subjectsActions.createSubject(
                        formState.inputValues.subject,
                    )
                );
                //props.navigation.goBack();
            }
        }
        catch (err) {
            setError(err.message);
        }

        setIsLoading(false);

    }, [dispatch, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

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

    const addSubjectHandler = useCallback(
        (subject) => {
            data = data.concat[subject]
        }
    );

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }
    // const { query } = '';
    // const data = [];

    var data = [
        { value: 'English' },
        { value: 'Spanish' },
        { value: 'German' },
        { value: 'French' },
        { value: 'Chinese' },
        { value: 'Language' },
        { value: 'Literature' },
        { value: 'Calculus' },
        { value: 'Geometry' },
        { value: 'Algebra' },
        { value: 'Biology' },
        { value: 'Physics' },
        { value: 'Chemistry' },
        { value: 'Computer Science' },
        { value: 'Social Studies' },
        { value: 'Science' },
        { value: 'History' },
        { value: 'Civics' },
        { value: 'Economics' },
        { value: 'Physical Ed' },
        { value: 'Band' },
        { value: 'Choir' },
        { value: 'Art' },
        { value: 'Other' },
        { value: 'Personal' },
        { value: 'Chores' }
    ];

    return (

        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            behavior="padding"
        //keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <View>
                        {data.toString}
                    </View>
                    <Input
                        id="subject"
                        label="Enter a Subject"
                        errorText="Please enter a valid subject!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        //onInputChange={inputChangeHandler}
                        onInputChange={(subject) => addSubjectHandler(subject)}
                        initialValue={editedProduct ? editedProduct.subject : ''}
                        initiallyValid={!!editedProduct}
                        required
                        maxLength={30}
                    />
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

SubjectsScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {

        headerTitle: navData.navigation.getParam('subjectId')
            ? 'Edit Task'
            : 'Edit Subject List',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginTop: 8
    },
});

export default SubjectsScreen;
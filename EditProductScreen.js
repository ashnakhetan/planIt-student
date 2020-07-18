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
  TouchableNativeFeedback,
  Button
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
//import { Autocomplete } from 'react-native-autocomplete-input'
//import DropdownMenu from 'react-native-dropdown-menu';
import { Dropdown } from 'react-native-material-dropdown';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
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
      updatedFormIsValid = updatedFormIsValid
        && updatedValidities["subject"]
        && updatedValidities["date"]
        && updatedValidities["title"]
        && updatedValidities["eTime"];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditProductScreen = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      subject: editedProduct ? editedProduct.subject : '',
      date: editedProduct ? editedProduct.date : '',
      description: editedProduct ? editedProduct.description : '',
      eTime: editedProduct ? editedProduct.eTime : ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      subject: editedProduct ? true : false,
      date: editedProduct ? true : false,
      description: editedProduct ? true : false,
      eTime: editedProduct ? true : false
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
      Alert.alert('Check input!', 'Please fill out all fields in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.date,
            formState.inputValues.subject,
            +formState.inputValues.eTime
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.date,
            formState.inputValues.subject,
            +formState.inputValues.eTime,
            completed = false
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);

  }, [dispatch, prodId, formState]);

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

  const submitFn = props.navigation.getParam('submit');

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
    { value: 'Personal' },
    { value: 'Chores' },
    { value: 'Spanish' },
    { value: 'German' },
    { value: 'French' },
    { value: 'Chinese' },
    { value: 'English' },
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
    { value: 'Psychology' },
    { value: 'Science' },
    { value: 'History' },
    { value: 'Civics' },
    { value: 'Economics' },
    { value: 'Physical Ed' },
    { value: 'Health' },
    { value: 'Band' },
    { value: 'Choir' },
    { value: 'Art' },
    { value: 'Other' }
  ];

  return (

    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      behavior="padding"
      resetScrollToCoords={{ x: 0, y: 0 }}
    >
      <ScrollView>
        <View style={styles.form}>

          <Text style={styles.label}>Subject</Text>

          <Dropdown
            id="subject"
            //label="select subject"
            //labelFontSize={5}
            fontSize={14}
            textColor='rgba(0, 0, 0, 1.0)'
            data={data}
            onChangeText={(subject) => inputChangeHandler('subject', subject, true)}
            value={editedProduct ? editedProduct.subject : ''}
            initiallyValid={!!editedProduct}
            required
            maxLength={30}
            dropdownOffset={{ top: 9, left: 0 }}
            pickerStyle={{
              height: '50%',
              marginTop: 80,
              paddingHorizontal: 13
            }}

          />
          {/* <Item label="Java" value="java" />
            <Item label="JavaScript" value="js" /> */}
          {/* </Autocomplete> */}

          <Input
            id="title"
            label="Task Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
            maxLength={30}
          />

          <Text style={styles.label}>Task Date</Text>

          <DatePicker
            label="Date"
            style={{ width: '100%' }}
            //date={this.state.date} //initial date from state
            date={formState.inputValues.date}
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="MM-DD-YYYY"
            minDate="01-01-2020"
            maxDate="12-01-2025"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                display: 'none',
                // position: 'absolute',
                // left: 0,
                // top: 4,
                // marginLeft: 0
              },
              dateInput: {
                borderColor: 'transparent',
                //paddingHorizontal: 2,
                paddingVertical: 5,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                //justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: 35
                //marginLeft: 36
              },
              placeholderText: {
                textAlign: 'right',
                justifyContent: 'flex-start'
              }
            }}
            onDateChange={(date) => inputChangeHandler('date', date, true)}
            initialValue={editedProduct ? editedProduct.date : ''}
            initiallyValid={!!editedProduct}
          //required
          />
          <Input
            id="eTime"
            label="Estimated Time (min)"
            errorText="Please enter a valid time in minutes!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.eTime.toString() : ''}
            initiallyValid={!!editedProduct}
            required
            min={0.1}
          />

          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline={true}
            numberOfLines={3}
            blurOnSubmit={true}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ' '}
            //initiallyValid={!!editedProduct}
            //so that description field can even be empty
            initiallyValid={true}
            //required
            minLength={null}
          />
          <View style={{ height: 35 }}></View>
          <Button
            title="Submit"
            onPress={submitFn}
          />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  //const submitFn = navData.navigation.getParam('submit');
  return {

    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Task'
      : 'Add Task',
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Save"
    //       iconName={
    //         Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
    //       }
    //       onPress={submitFn}
    //     />
    //   </HeaderButtons>
    // )
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

export default EditProductScreen;
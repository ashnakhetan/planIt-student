import React from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import moment from 'moment';

import HeaderButton from '../../components/UI/HeaderButton';
// import ProductItem from '../../components/shop/ProductItem';
// import * as productsActions from '../../store/actions/products';

const AnalyticsScreen = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    var currentDate = moment().format("MM-DD-YYYY");

    const tasks = useSelector(state => state.products.userProducts.filter(task => task.completed === false));
    const completedTasks = useSelector(state => state.products.userProducts.filter(task => task.completed === true));
    var numTasks = tasks.length + completedTasks.length;
    var numCompletedTasks = completedTasks.length;
    var totalTimeCompleted = 0;
    var totalTimeLeft = 0;
    //const tasksToday = tasks.filter(task => task.date === ("0" + month + "-" + date + "-" + year));
    const tasksToday = tasks.filter(task => task.date === currentDate);
    //learn how to get 04 rather than 4
    //const completedTasksToday = completedTasks.filter(task => task.date === ("0" + month + "-" + date + "-" + year));
    const completedTasksToday = completedTasks.filter(task => task.date === currentDate);
    var numTasksToday = tasksToday.length + completedTasksToday.length;
    var numCompletedTasksToday = completedTasksToday.length;
    var totalTimeCompletedToday = 0;
    var totalTimeLeftToday = 0;

    for (var i = 0; i < completedTasks.length; i++) {
        totalTimeCompleted += completedTasks[i].eTime;
    }

    for (var i = 0; i < tasks.length; i++) {
        totalTimeLeft += tasks[i].eTime;
    }

    for (var i = 0; i < completedTasksToday.length; i++) {
        totalTimeCompletedToday += completedTasks[i].eTime;
    }

    for (var i = 0; i < tasksToday.length; i++) {
        totalTimeLeftToday += tasksToday[i].eTime;
    }

    const goToTasksHandler = () => {
        props.navigation.navigate('ProductsOverview');
    };

    if ((numCompletedTasks === numTasks) && (numCompletedTasksToday === numTasksToday)) {
        return (
            <View style={styles.centered3}>
                <Text style={styles.complete}>You have completed every item on your list! Good job :) </Text>
            </View>
        )
    }
    else if (numCompletedTasksToday === numTasksToday) {
        return (
            <ScrollView style={styles.centered}>
                <View style={styles.touchable}>
                    <TouchableCmp onPress={() => {
                        goToTasksHandler();
                    }} useForeground>
                        <View style={styles.centered2}>
                            <Text style={styles.titles}>For Today... </Text>
                            <Text style={styles.text}>You have completed all of your tasks today. Good job! </Text>
                        </View>
                    </TouchableCmp>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 10 }} />
                <View style={styles.touchable}>
                    <TouchableCmp
                        onPress={() => {
                            goToTasksHandler();
                        }} useForeground>
                        <View style={styles.centered1}>
                            <Text style={styles.titles}>Overall... </Text>
                            <Text style={styles.text}>You have completed {numCompletedTasks} of your {numTasks} tasks. </Text>
                            <Text style={styles.text}>So far you've spent {totalTimeCompleted} minutes on your work! </Text>
                            <Text style={styles.text}>You have {totalTimeLeft} minutes left to go. </Text>
                        </View>
                    </TouchableCmp>
                </View>
            </ScrollView>
        )
    }
    else {
        return (
            <ScrollView style={styles.centered}>
                <View style={styles.touchable}>
                    <TouchableCmp onPress={() => {
                        goToTasksHandler();
                    }} useForeground>
                        <View style={styles.centered2}>
                            <Text style={styles.titles}>For Today... </Text>
                            <Text style={styles.text}>You have completed {numCompletedTasksToday} of your {numTasksToday} tasks! </Text>
                            <Text style={styles.text}>So far you've spent {totalTimeCompletedToday} minutes on your tasks. </Text>
                            <Text style={styles.text}>You have {totalTimeLeftToday} minutes left to go. </Text>
                        </View>
                    </TouchableCmp>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 10 }} />
                <View style={styles.touchable}>
                    <TouchableCmp
                        onPress={() => {
                            goToTasksHandler();
                        }} useForeground>
                        <View style={styles.centered1}>
                            <Text style={styles.titles}>Overall... </Text>
                            <Text style={styles.text}>You have completed {numCompletedTasks} of your {numTasks} tasks. </Text>
                            <Text style={styles.text}>So far you've spent {totalTimeCompleted} minutes on your work! </Text>
                            <Text style={styles.text}>You have {totalTimeLeft} minutes left to go. </Text>
                        </View>
                    </TouchableCmp>
                </View>
            </ScrollView>
        )
    }
};

AnalyticsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Analytics',

        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    product: {
        //height: 400,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        //height: 200
        //overflow: 'hidden'
    },
    complete: {
        margin: 10,
        fontFamily: 'open-sans-bold',
        textAlign: 'left',
        fontSize: 18,
    },
    titles: {
        margin: 10,
        fontFamily: 'open-sans-bold',
        textAlign: 'left',
        fontSize: 25,
    },
    centered: {
        //flex: 1,
        //justifyContent: 'center',
        //textAlign: 'left',
        //fontSize: 15,
        textAlignVertical: 'center',
        margin: 15,
        flexDirection: 'column',    //its children will be in a column
        //flexWrap: "wrap"
    },
    centered1: {
        //flex: 1,
        justifyContent: 'center',
        textAlign: 'left',
        fontSize: 15,
        textAlignVertical: 'center',
        margin: 15,
        backgroundColor: '#ffe4e1',
        // flexWrap: "wrap",
        // flexDirection: 'column',    //its children will be in a column
    },
    centered2: {
        //flex: 1,
        justifyContent: 'center',
        textAlign: 'left',
        fontSize: 15,
        textAlignVertical: 'center',
        margin: 15,
        backgroundColor: '#b0e0e6',
        // flexWrap: "wrap",
        // flexDirection: 'column',
        //flexWrap: "wrap"
    },
    centered3: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'left',
        fontSize: 15,
        //textAlignVertical: 'center',
        margin: 15,
        backgroundColor: '#b0e0e6',
        //alignSelf: 'center'
        //flexWrap: "wrap"
    },
    text: {
        margin: 15,
    }
});

export default AnalyticsScreen;
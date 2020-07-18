import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    ActivityIndicator,
    StyleSheet,
    Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

import HeaderButton from '../../components/UI/HeaderButton';

const DeleteTasksScreen = props => {

    const completedTasks = useSelector(state => state.products.userProducts.filter(task => task.completed === true));
    const dispatch = useDispatch();

    const deleteHandler = useCallback(async () => {
        if (completedTasks.length == 0) {
            Alert.alert('No Items', 'There are no completed tasks in your list!', [
                { text: 'Ok', style: 'default' },
            ]);
        }
        else {

            // Alert.alert('Are you sure?', 'Do you really want to clear Completed Task List?', [
            //     { text: 'No', style: 'default' },
            //     {
            //         text: 'Yes',
            //         style: 'destructive',
            //         onPress: () => 
            {
                for (var i = 0; i < completedTasks.length; i++) {
                    dispatch(productsActions.deleteProduct(completedTasks[i].id));
                }
            }

            // },
            props.navigation.goBack()
        }
        //]);
        //}
    }, [dispatch]);
    //props.navigation.goBack();

    return (
        <View style={styles.centered}>
            <Button
                color={Colors.secondary}
                title={"Are you sure?"}
                onPress={deleteHandler}
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
        textAlignVertical: 'center'
    }
});

export default DeleteTasksScreen;
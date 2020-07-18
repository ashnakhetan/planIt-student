import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import CompletedTaskItem from '../../components/shop/CompletedTaskItem';
//import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const TasksCompletedScreen = props => {

  //const completedTasks = useSelector(state => state.products.completedTasks);
  const completedTasks = useSelector(state => state.products.userProducts.filter(task => task.completed === true));
  const dispatch = useDispatch();

  if (completedTasks.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No tasks completed; get to work!</Text>
      </View>
    );
  }
  return (
    <FlatList
      // onRefresh={loadProducts}
      // refreshing={isRefreshing}
      //since we never load anything.
      data={completedTasks}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <CompletedTaskItem
          subject={itemData.item.subject}
          title={itemData.item.title}
          eTime={itemData.item.eTime}
          date={itemData.item.date}
          description={itemData.item.description}
        >
        </CompletedTaskItem>
      )}
    />
  );
};

TasksCompletedScreen.navigationOptions = navData => {

  //const deleteFn = navData.navigation.getParam('delete');
  //const cTask = navData.navigation.getParam('cTask');

  return {
    headerTitle: 'Completed Tasks',
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Clear"
          iconName={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
          //onPress={deleteFn}
          onPress={() => {
            navData.navigation.navigate('DeleteTasks');
          }}
        //ashna- come back and clear
        />
      </HeaderButtons>
    )

  }
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default TasksCompletedScreen;
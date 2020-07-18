import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
  DrawerItems,
  createBottomTabNavigator
} from 'react-navigation';
import { Platform, SafeAreaView, Button, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import TasksCompletedScreen from '../screens/shop/TasksCompletedScreen';
import DeleteTasksScreen from '../screens/shop/DeleteTasksScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import AnalyticsScreen from '../screens/shop/AnalyticsScreen';
import SubjectsScreen from '../screens/user/SubjectsScreen';
import PrivacyPolicyScreen from '../screens/shop/PrivacyPolicyScreen';
import ForgotPwdScreen from '../screens/user/ForgotPwdScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.secondary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.secondary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    EditProduct: EditProductScreen
    //TasksCompleted: TasksCompletedScreen,
    //ProductDetail: ProductDetailScreen,
    //Cart: TasksCompletedScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const CompletedNavigator = createStackNavigator(
  {
    TasksCompleted: TasksCompletedScreen,
    DeleteTasks: DeleteTasksScreen
    //EditProduct: EditProductScreen
    //TasksCompleted: TasksCompletedScreen,
    //ProductDetail: ProductDetailScreen,
    //Cart: TasksCompletedScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-checkmark' : 'playlist-add-check'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AnalyticsNavigator = createStackNavigator(
  {
    Analytics: AnalyticsScreen,
    //EditProduct: EditProductScreen
    //TasksCompleted: TasksCompletedScreen,
    //ProductDetail: ProductDetailScreen,
    //Cart: TasksCompletedScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-analytics' : 'ios-analytics'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const SubjectsNavigator = createStackNavigator(
  {
    Subjects: SubjectsScreen,
    //EditProduct: EditProductScreen
    //TasksCompleted: TasksCompletedScreen,
    //ProductDetail: ProductDetailScreen,
    //Cart: TasksCompletedScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const TabsNavigator = createBottomTabNavigator(
  {
    Overview: {
      screen: ProductsNavigator,
      navigationOptions: () => ({
        tabBarLabel: 'Tasks',
        tabBarOptions: {
          activeTintColor: Colors.secondary,
        },
        //tabBarLabel: () => { return null },
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            //name={Platform.OS === 'android' ? 'list-unordered' : 'list-unordered'}
            size={32}
            style={{ color: focused ? `${Colors.secondary}` : tintColor }}
          //color={Colors.secondary} 
          />
        )
      })
    },
    Completed: {
      screen: CompletedNavigator,
      navigationOptions: () => ({
        tabBarOptions: {
          activeTintColor: Colors.secondary,
        },
        //tabBarLabel: () => { return null },
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            //name={Platform.OS === 'android' ? 'tasklist' : 'tasklist'}
            size={32}
            style={{ color: focused ? `${Colors.secondary}` : tintColor }}
          />
        )
      })
    },
    Analytics: {
      screen: AnalyticsNavigator,
      navigationOptions: () => ({
        tabBarOptions: {
          activeTintColor: Colors.secondary,
        },
        //tabBarLabel: () => { return null },
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-analytics' : 'ios-analytics'}
            size={32}
            style={{ color: focused ? `${Colors.secondary}` : tintColor }}
          />
        )
      })
    },
  },
);

const ShopNavigator = createDrawerNavigator(
  {
    Tasks: TabsNavigator,
    //Subjects: SubjectsNavigator
    //Tasks: ProductsNavigator,
    //Completed: CompletedNavigator,
    //Analytics: AnalyticsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.secondary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.secondary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  },
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Forgot: ForgotPwdScreen,
    Privacy: PrivacyPolicyScreen

  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
  Tab: TabsNavigator,
});

export default createAppContainer(MainNavigator);

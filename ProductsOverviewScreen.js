import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Alert,
  StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.secondary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.secondary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No tasks; maybe start adding some!</Text>
      </View>
    );
  }
  // var data = products.filter(task => task.completed === false);
  // data.sort(function (a, b) { return a - b });

  return (
    <View>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products.filter(task => task.completed === false)}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            subject={itemData.item.subject}
            title={itemData.item.title}
            eTime={itemData.item.eTime}
            date={itemData.item.date}
            description={itemData.item.description}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.secondary}
              title="Edit Details"
              onPress={() => {
                editProductHandler(itemData.item.id);
              }}
            // onPress={() => {
            //   selectItemHandler(itemData.item.id, itemData.item.title);
            // }}
            />
            <Button
              color={Colors.secondary}
              title="Mark Done"
              onPress={() => {
                dispatch(productsActions.updateProduct(
                  itemData.item.id, itemData.item.title, itemData.item.description, itemData.item.date, itemData.item.subject, itemData.item.eTime, itemData.item.completed = true
                ))
                //{() => {
                //dispatch(productActions.CREATE_(itemData.item)),
                // dispatch(
                //   productsActions.createCompletedTask(
                //     itemData.item.title, itemData.item.description, itemData.item.subject, itemData.item.eTime)
                // ),
                //deleteHandler.bind(this, itemData.item.id)

              }}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Task List',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
            navData.navigation.navigate('Shop');
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default ProductsOverviewScreen;
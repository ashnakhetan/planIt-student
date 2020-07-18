import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import moment from 'moment';

import Card from '../UI/Card';
import { ScrollView } from 'react-native-gesture-handler';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;
  var currentDate = moment().format("MM-DD-YYYY");

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  if (props.date < currentDate) {
    return (
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <View onPress={props.onSelect} useForeground>
            <View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.subject}: {props.title}</Text>
                <View style={styles.timeLine}>
                  {/* //each used to have style={{ paddingHorizontal: 80 }} to do space */}
                  <View><Text style={styles.eTimeYesterday}>{props.date}: </Text></View>
                  <View><Text style={styles.eTime}>{props.eTime} min </Text></View>
                </View>
                <ScrollView>
                  <Text style={styles.description}>{props.description}</Text>
                </ScrollView>
              </View>
              <View style={styles.actions}>
                {props.children}
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  }
  else if (props.date === currentDate) {
    return (
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <View onPress={props.onSelect} useForeground>
            <View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.subject}: {props.title}</Text>
                <View style={styles.timeLine}>
                  {/* //each used to have style={{ paddingHorizontal: 80 }} to do space */}
                  <View><Text style={styles.eTimeToday}>{props.date}: </Text></View>
                  <View><Text style={styles.eTime}>{props.eTime} min </Text></View>
                </View>
                <ScrollView>
                  <Text style={styles.description}>{props.description}</Text>
                </ScrollView>
              </View>
              <View style={styles.actions}>
                {props.children}
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  }
  else {
    return (
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <View onPress={props.onSelect} useForeground>
            <View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.subject}: {props.title}</Text>
                <View style={styles.timeLine}>
                  {/* //each used to have style={{ paddingHorizontal: 80 }} to do space */}
                  <View><Text style={styles.eTime}>{props.date}: </Text></View>
                  <View><Text style={styles.eTime}>{props.eTime} min </Text></View>
                </View>
                <ScrollView>
                  <Text style={styles.description}>{props.description}</Text>
                </ScrollView>
              </View>
              <View style={styles.actions}>
                {props.children}
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  };
};

const styles = StyleSheet.create({
  product: {
    //height: 136,
    flex: 1,
    marginVertical: 10,
    paddingBottom: 10,
    marginHorizontal: 20
  },
  touchable: {
    borderRadius: 7,
    overflow: 'hidden'
  },
  details: {
    alignItems: 'center',
    //height: '75%',
    width: '100%',
    paddingTop: 10,
    //paddingBottom: 0
  },
  titleToday: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: '#ff4500'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  timeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'space-between',
  },
  eTimeYesterday: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#ff0000'
  },
  eTimeToday: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#0000cd'
  },
  eTime: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  description: {
    fontFamily: 'open-sans',
    //height: '60%',
    fontSize: 12,
    paddingHorizontal: 20,
    flex: 1,
    textAlignVertical: 'center'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //height: '24%',
    paddingHorizontal: 20,
    //marginTop: 2
  }
});

export default ProductItem;

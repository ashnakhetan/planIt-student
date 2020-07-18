import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

import Card from '../UI/Card';
import { ScrollView } from 'react-native-gesture-handler';

const CompletedTaskItem = props => {

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <View onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.subject}: {props.title}</Text>
                            <Text style={styles.eTime}>{props.date}: {props.eTime} min </Text>
                            {/* <ScrollView>
                                <Text style={styles.description}>{props.description}</Text>
                            </ScrollView> */}
                        </View>
                        {/* <View style={styles.actions}>
                            {props.children}
                        </View> */}
                    </View>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    product: {
        //height: 87,
        //height: 'fit-content',
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
        height: '100%',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 0
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    eTime: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
});

export default CompletedTaskItem;

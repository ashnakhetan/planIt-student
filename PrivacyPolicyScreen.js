import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

const PrivacyPolicyScreen = props => {

    return (
        <ScrollView>
            <Text style={styles.headers}>
                Privacy Policy
</Text>
            <Text style={styles.body}>
                Thank you for choosing to utilize the PlanIt App! We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our notice or our practices with regards to your personal information, please contact us at planitapp2020@gmail.com.
            {"\n"}{"\n"}
            In this privacy notice, we explain what information we collect and how we use it. If there are any terms in this privacy notice that you do not agree with, please discontinue the use of our App.

</Text>
            <Text style={styles.headers}>
                Your Data in PlanIt
                </Text>
            <Text style={styles.body}>
                We’ll keep this short: You provide us with an email address to create your account with us. We DO NOT ask for any other personal information such as your name, birth date, address, etc.
                Please do not store any personal or sensitive information in your tasks or their details.
                All of your data (tasks and their details) are stored in a secure database that is accessible only by your account and the administrators (only as needed to service your account).

                </Text>

            <Text style={styles.headers}>
                We will NOT share your information with any third-party sites.
                </Text>
            <Text style={styles.body}>
                We only share information with your additional consent, to comply with laws, to provide you with services, and to protect your rights.
</Text>
            <Text style={styles.headers}>
                How to Delete Your Data
                </Text>
            <Text style={styles.body}>
                To permanently delete your data from our database, simply mark all tasks as done by clicking ‘Mark Done’ and then delete them from the Completed Tasks list. This will permanently delete all your tasks data from the database. That's it!
</Text>
            <Text style={styles.headers}>
                Your Device
                </Text>
            <Text style={styles.body}>
                We collect NO information from your device.
                </Text>

            <Text style={styles.headers}>
                Our Efforts to Keep Your Data Safe
                                </Text>
            <Text style={styles.body}>
                We have implemented appropriate technical measures to protect the security of the data we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. You should only access the services within a secure environment.
                </Text>

            <Text style={styles.headers}>
                Updates to Privacy Policy
                </Text>

            <Text style={styles.body}>
                If we make any updates to this Privacy Policy, the updated version will be indicated by a “Revised” tag and date.  The updated version will be effective immediately. We will notify you by prominently posting a notice of such changes on the app.

                {"\n"}{"\n"}
                Thank you again for using PlanIt! Hope you enjoy.
                {"\n"}{"\n"}
                Questions? planitapp2020@gmail.com
        </Text>
            <Text>
                {"\n"}{"\n"}{"\n"}
            </Text>
        </ScrollView>
    )
}

PrivacyPolicyScreen.navigationOptions = {
    headerTitle: 'Privacy Policy'
};

const styles = StyleSheet.create({
    headers: {
        fontFamily: 'open-sans-bold',
        marginLeft: 15,
        marginVertical: 15
    },
    body: {
        fontFamily: 'open-sans',
        marginHorizontal: 15
    }
});

export default PrivacyPolicyScreen;

import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Screens } from '../constants/NavConstants';
import BottomTabs from './BottomTabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DayEdit from '../Screens/DayEdit';
import CustomHeader from '../utils/CustomHeader';
import { Images } from '../Assets';
import DayView from '../Screens/DayView';
import PhotoView from '../Screens/PhotoView';

const Stack = createNativeStackNavigator()

const AppNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({ navigation }) => ({
                    headerTitleAlign: 'center',
                    header: () => <CustomHeader backArrow={Images.back_arrow} navigation={navigation} />,
                    headerTitleStyle: styles.title,
                    contentStyle: { backgroundColor: 'transparent' },
                })}>
                <Stack.Screen
                    name={Screens.BottomTabs}
                    component={BottomTabs}
                    options={({ navigation }) => ({
                        headerShown: false,
                    })}
                />
                <Stack.Screen
                    name={Screens.DayEdit}
                    component={DayEdit}
                />

                <Stack.Screen
                    name={Screens.DayView}
                    component={DayView}
                />
                <Stack.Screen
                    name={Screens.PhotoView}
                    component={PhotoView}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default memo(AppNav)

const styles = StyleSheet.create({

});

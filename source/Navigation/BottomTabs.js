import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Screens } from '../constants/NavConstants';
import { Images, colors } from '../Assets';
import HomeScreen from '../Screens/HomeScreen';
import FastImage from 'react-native-fast-image';
import CustomHeader from '../utils/CustomHeader';
import Summary from '../Screens/Summary';
import ImagePicker from 'react-native-image-crop-picker';
import { getLocation } from 'react-native-weather-api';
import { useDispatch } from 'react-redux';
import { addData } from '../Redux/DailyData';
import { fetchLocation } from '../utils/FetchLocation';
import { PERMISSIONS, check } from 'react-native-permissions';
import Popup from '../utils/Popup';

const Tabs = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
    const dispatch = useDispatch();
    const popupRef = useRef()

    const tabButton = useCallback(
        (focused, imageActive, imageInactive) => {
            return (
                <FastImage
                    style={styles.tabIcon}
                    source={focused ? imageActive : imageInactive}
                    resizeMode="contain"
                />
            );
        },
        [],
    );

    const navHandler = useCallback(() => {
        navigation.navigate(Screens.DayEdit)
    }, [])

    const getTemperatureHandler = useCallback(async (imgPath) => {
        const result = await fetchLocation()
        dispatch(addData({
            image: imgPath,
            date: new Date(),
            location: result?.city?.name + ', ' + result?.city?.country,
            temperature: result?.list[0]?.main?.temp,
            thoughts: '',
        }))
        navHandler()
    }, [])

    const permissionHandler = useCallback(async () => {
        const permission = await check(PERMISSIONS.ANDROID.CAMERA);
        if (permission === 'granted') {
            OpenCameraHandler()
        }
        else {
            popupRef.current?.toggle()
        }
    }, [])

    const OpenCameraHandler = useCallback(() => {
        ImagePicker.openCamera({
            freeStyleCropEnabled: true,
            cropping: true,
            useFrontCamera: false,
        }).then(image => {
            getTemperatureHandler(image?.path)
        });
    }, [])

    const openSettingHandler = useCallback(async () => {
        popupRef.current?.toggle()
        openSettings();
    }, [])



    return (
        <>
            <Tabs.Navigator
                // sceneContainerStyle={{ backgroundColor: 'transparent' }}
                screenOptions={{
                    tabBarShowLabel: false,
                    // tabBarBackground: () => <CustomTabBar />,
                    tabBarStyle: [styles.tabBar],
                    header: () => <CustomHeader />
                    // headerTitleAlign: 'center',
                    // headerTitleStyle: styles.title,
                    // headerStyle: { backgroundColor: 'transparent' },
                }}>
                <Tabs.Screen
                    name={Screens.Home}
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            tabButton(focused, Images.homeActive, Images.homeInactive),
                    }}
                />
                <Tabs.Screen
                    name={Screens.Summary}
                    component={Summary}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            tabButton(focused, Images.infoActive, Images.infoInactive),
                    }}
                />

            </Tabs.Navigator>
            <Pressable style={styles.addView} onPress={permissionHandler}>
                <FastImage source={Images.plus} resizeMode='contain' style={styles.plus} />
            </Pressable>
            <Popup ref={popupRef} title={'Allow Access!'} description={'Open settings to give permissions...'} onConfirm={openSettingHandler} />
        </>

    )
};

const styles = StyleSheet.create({
    BottomTabs: {
        flex: 1,
    },
    tabBar: {
        height: 56,
        width: '100%',
        backgroundColor: colors.white
    },
    tabIcon: {
        width: 24,
        height: 24,
    },
    addView: {
        width: 56,
        height: 56,
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: colors.white,
        borderColor: colors.greyE8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 17,
        alignSelf: 'center',
    },
    plus: {
        width: 24,
        height: 24,
    },
});

export default memo(BottomTabs);

import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useRef, useState } from 'react'
import { GlobalStyle } from '../constants/globalstyle'
import CustomImage from '../utils/CustomImage';
import CustomInput from '../utils/CustomInput';
import { Fonts, Images, colors } from '../Assets';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { addData, dailyUpdate } from '../Redux/DailyData';
import ImagePicker from 'react-native-image-crop-picker';
import { fetchLocation } from '../utils/FetchLocation';
import { Screens } from '../constants/NavConstants';
import Loader from '../utils/Loader';

const DayEdit = ({ navigation }) => {
    const dailyData = useSelector(dailyUpdate);
    const dispatch = useDispatch();
    const inputRef = useRef();
    const loaderRef = useRef();

    const saveHandler = useCallback(() => {
        dispatch(addData({
            ...dailyData[0],
            thoughts: inputRef.current?.value(),
        }))
        navigation.navigate(Screens.Home)
    }, [dailyData])

    const getTemperatureHandler = useCallback(async (imgPath) => {
        try {
            loaderRef.current?.start();
            const result = await fetchLocation()
            dispatch(addData({
                image: imgPath,
                date: new Date(),
                location: result?.city?.name + ', ' + result?.city?.country,
                temperature: result?.list[0]?.main?.temp,
                thoughts: inputRef.current?.value(),
            }))
        } catch (e) {
            console.log(e);
        } finally {
            loaderRef.current?.stop();
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
    }, [getTemperatureHandler])



    return (
        <View style={GlobalStyle.root}>
            <CustomImage item={dailyData[0]} />
            <Pressable style={styles.capView} onPress={OpenCameraHandler} >

                <FastImage source={Images.capture} style={styles.capture} resizeMode='contain' />
            </Pressable>
            <CustomInput ref={inputRef} placeholder={'Type your thoughts...'} inputStyle={styles.input} />
            <Pressable onPress={saveHandler}>
                <Text style={styles.save}>{'Save'}</Text>
            </Pressable>
            <Loader ref={loaderRef} />
        </View>
    )
}

export default memo(DayEdit)

const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: 300,
        textAlignVertical: 'top',
        alignSelf: 'center',
        fontFamily: Fonts.Inter400,
        fontSize: 16,
        color: colors.grey6C,

    },
    capView: {
        top: -28,
        alignSelf: 'center',
    },
    capture: {
        width: 56,
        height: 56,
    },
    save: {
        fontFamily: Fonts.Inter400,
        fontSize: 32,
        color: colors.blue,
        alignSelf: 'center',
        textDecorationLine: 'underline',
    },
})
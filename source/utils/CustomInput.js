import { StyleSheet, TextInput } from 'react-native'
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'

const CustomInput = forwardRef((props, ref) => {
    const [input, setInput] = useState('');

    useImperativeHandle(
        ref,
        () => {
            return {
                value: () => input,
                setValue: value => setInput(value),
            };
        },
        [input],
    );

    return (
        <TextInput
            value={input}
            placeholder={props.placeholder}
            style={[props.inputStyle]}
            onChangeText={setInput}
            placeholderTextColor={props.placeholder}
            keyboardType={props.keyboardType}
            multiline={props.multiline}
        />
    );
});


export default memo(CustomInput)

const styles = StyleSheet.create({})
import { StyleSheet } from "react-native";
import { Images } from "../Assets";

export const GlobalStyle = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
});


export const dummy = [
    {
        image: Images.image,
        month: 'Jan',
        date: '18',
        location: 'Pune, India',
        temperature: '34'
    }
]


export const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
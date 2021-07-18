import { StyleSheet, View } from 'react-native';
export type propsTypeText = {
    colorPrimary: String,
    colorSecondary: Stirng
}
export type propsType = {
    colorPrimary: String,
    colorSecondary: Stirng
}
const Themas = {
    default: {
        colorPrimary: "#ffffff",
        colorSecondary: "#000000"
    },
    dark: {
        colorPrimary: "#000000",
        colorSecondary: "#ffffff"

    }
};
export default Themas;
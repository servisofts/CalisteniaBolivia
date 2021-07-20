import { StyleSheet, View } from 'react-native';
export type propsTypeText = {
    colorPrimary: String,
    colorSecondary: Stirng,
}
export type propsType = {
    colorPrimary: String,
    colorSecondary: Stirng,
    backgroundColor: Stirng,

}
const Themas = {
    default: {
        colorPrimary: "#ffffff",
        colorSecondary: "#000000",
        backgroundColor: "#222222",
    },
    dark: {
        colorPrimary: "#000000",
        colorSecondary: "#ffffff",
        backgroundColor: "#dddddd",

    }
};
export default Themas;
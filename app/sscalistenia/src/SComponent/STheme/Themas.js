import { StyleSheet, View, ColorPropType } from 'react-native';
export type propsTypeText = {
    colorPrimary: String,
    colorSecondary: Stirng,
}
export type propsType = {
    colorPrimary: ColorPropType,
    colorSecondary: ColorPropType,
    backgroundColor: ColorPropType,
    colorDanger: ColorPropType,
    colorOpaque: ColorPropType,

}
const Themas = {
    default: {
        colorPrimary: "#ffffff",
        colorSecondary: "#000000",
        backgroundColor: "#222222",
        colorDanger: "#ff0000",
        colorOpaque:"#aaaaaa"
    },
    dark: {
        colorPrimary: "#000000",
        colorSecondary: "#ffffff",
        backgroundColor: "#dddddd",
        colorDanger: "#ff0000",
        colorOpaque:"#884444"

    }
};
export default Themas;
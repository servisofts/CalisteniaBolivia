import { SThemeThemes } from 'servisofts-component';
import MapStyle from './mapStyle'

const theme: SThemeThemes = {
    default: {
        barStyle: "light-content",
        barColor: "#000000",
        text: "#A4A3A3",
        primary: "#000000",
        secondary: "#D70000",
        info: "#DE5738",
        background: "#000000",
        card: "#eeeeee99",
        accent:"#99CC00",
        mapStyle: MapStyle,
        font:"OpenSans-SemiBold",
        lightBlack:"#DADADA"

    },
    dark: {
        barStyle: "light-content",
        barColor: "#FF6600",
        text: "#ffffff",
        primary: "#FF6600",
        secondary: "#000000",
        info: "#DE5738",
        background: "#000000",
        card: "#44444499",
        accent:"#99CC00",
        mapStyle: MapStyle,
        font:"OpenSans-SemiBold"
    }
}
export default theme;
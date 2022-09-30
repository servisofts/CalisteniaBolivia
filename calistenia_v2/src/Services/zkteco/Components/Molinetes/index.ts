//  COMPONENT CONFIG
const component = "molinetes"; // COMPONENT NAME 
const version = "1.0";
// ---------------------------------------
import Home from "./Pages/Home";
export default {
    component,
    version,
    Pages: {
        [component]: Home,
    }
}
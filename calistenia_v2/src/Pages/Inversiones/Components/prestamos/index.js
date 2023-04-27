//  COMPONENT CONFIG
const component = "prestamos"; // COMPONENT NAME
// ---------------------------------------

import lista from "./Pages/lista";
import registro from "./Pages/registro";

export default {
  component,
  Reducers: {
  },
  Pages: {
    [component]: registro,
    [component + "/lista"]: lista,
    [component + "/registro"]: registro,
  },
}
import Models from "./Models";
import Add from "./Pages/Add";
import Home from "./Pages/Home";
import Search from "./Pages/Search";

export default {
    Pages: {
        "client": Home,
        "client/add": Add,
        "client/search": Search
    },
    Reducers: Models.Reducers
}
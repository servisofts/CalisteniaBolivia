import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SComponentContainer, SIcon, SNavigation, SView } from 'servisofts-component';
import Pages from './Pages';
import Assets from './Assets';

//---------REDUX----------
import Reducer from './Reducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
// import SSocket from './SSocket';
//------------------------
import SConfig from './SConfig';
import SSocket, { setProps } from 'servisofts-socket'
setProps(SConfig.SocketProps);

const store = createStore(
    Reducer,
    {},
    applyMiddleware(reduxThunk),
);

const App = (props) => {
    return (
        <Provider store={store}>
            <SComponentContainer
                debug
                socket={SSocket}
                assets={Assets}
                theme={{ initialTheme: "primary", themes: SConfig.SThemeProps }}>
                <SNavigation props={{
                    prefixes: ["https://component.servisofts.com", "component.servisofts://"],
                    pages: Pages
                }} />
                <SSocket />
            </SComponentContainer>
        </Provider>
    )
}
export default App;
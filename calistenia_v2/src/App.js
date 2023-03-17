import React from 'react';
import { SComponentContainer, SIcon, SNavigation, SView } from 'servisofts-component';
import SSocket, { setProps } from 'servisofts-socket'
import Redux, { store } from './Redux';
import Config from "./Config";
import Assets from './Assets';
import Pages from './Pages';
import BackgroundImage from './Components/BackgroundImage';
// import SSRolesPermisos from './SSRolesPermisos';
import BarraSuperior from './Components/BarraSuperior';
setProps(Config.socket);

const App = (props) => {
    return <Redux>
        <SComponentContainer
            debug
            socket={SSocket}
            assets={Assets}
            background={<BackgroundImage />}
            inputs={Config.inputs}
            theme={{ initialTheme: "dark", themes: Config.theme }}>
            <SNavigation props={{
                // prefixes: ["https://component.servisofts.com", "component.servisofts://"],
                pages: Pages,
                title: "Calistenia-Bolivia",
                navBar: BarraSuperior
            }} />
            <SSocket store={store} identificarse={(props) => {
                var usuario = props.state.usuarioReducer.usuarioLog;
                return {
                    data: usuario ? usuario : {},
                    deviceKey: "as-asa-as",
                }
            }} />
            {/* <SSRolesPermisos /> */}
        </SComponentContainer>
    </Redux>
}
export default App;
import { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SImage, SInput, SList, SNavigation, SPage, SText, STheme, SView, Submit } from 'servisofts-component';
import TopBar from '../Components/TopBar';
import SSocket from 'servisofts-socket'
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getInputFoto = () => {
        return <SView col={"xs-12"} height={400} center>
            <SInput ref={ref => this._image = ref} type={"image"}
                col={"xs-12"}
                style={{
                    resizeMode: "cover",
                    // width: "100%",
                    height: 300,
                    // backgroundColor: "#fff",
                }} />
            <SHr />
            <SInput ref={ref => this._descripcion = ref} col={"xs-11"} type={"textArea"} customStyle={"calistenia"} />
        </SView>
    }

    getBtnOk() {
        return <SText onPress={() => {
            var descripcion = this._descripcion.getValue();
            const data = {
                component: "publicacion",
                type: "subirFoto",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                publicacion: {
                    descripcion: descripcion,
                    observacion: "",
                    key_sucursal: "ff7f8192-ff66-4e97-8a8e-23daefe57743"
                }
            };
            var url = SSocket.api.root+"multipart/";
            var files = this._image.getValue();
            Submit.http(data, url, files, (cb) => {
                if(cb.estado == "exito"){
                    SNavigation.goBack();
                }
            })
        }} style={{
            padding: 8,

        }}>Action</SText>
    }
    render() {
        return (
            <>
                <TopBar options={[
                ]} />
                <SPage title={'Home'} hidden>
                    {this.getInputFoto()}
                    {this.getBtnOk()}
                </SPage>
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Add);
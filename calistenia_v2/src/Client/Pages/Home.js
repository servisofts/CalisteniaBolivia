import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import TopBar from '../Components/TopBar';
import Models from '../Models';
import SSocket from 'servisofts-socket'
import Usuario from '../../Pages/Usuario';
import BottomBar from '../Components/BottomBar';
const Card = (props) => {
    var obj = props.data;
    var usuario_txt = (props?.usuario?.Nombres ?? "..") + " " + (props?.usuario?.Apellidos ?? "..");

    var diff_t = new SDate(obj.fecha_on).diffTime(new SDate())
    var diff = diff_t / 1000;
    var diff_minutes = parseInt(diff / 60)
    var diff_hours = parseInt(diff_minutes / 60)
    var diff_days = parseInt(diff_hours / 24)
    var diff_str = "Ahora"
    if (diff_hours >= 24) {
        diff_str = diff_str = `hace ${diff_days} día`

        if (diff_days > 1) {
            diff_str += "s"
        }
    } else if (diff_minutes >= 60) {
        diff_str = `hace ${diff_hours} hora`
        if (diff_hours > 1) diff_str += "s"
    } else if (diff_minutes > 0) {
        diff_str = `hace ${diff_minutes} minuto`
        if (diff_minutes > 1) diff_str += "s"
    }

    return <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center style={{
        maxWidth: 400,
        borderWidth: 1,
        borderColor: STheme.color.card,
        borderRadius: 8
    }}>
        <SView col={"xs-11"} center>
            <SHr />
            <SView col={"xs-12"} row style={{
                alignItems: 'center',
            }}>
                <SView style={{
                    width: 33,
                    height: 33,
                    borderRadius: 100,
                    // background: STheme.color.lightGray,
                    overflow: 'hidden',
                }}>
                    <SImage src={SSocket.api.root + "usuario_" + obj.key_usuario} style={{
                        resizeMode: "cover"
                    }} />
                </SView>
                <SView width={8} />
                <SView flex>
                    <SText fontSize={12} bold font={"Roboto"}>{usuario_txt}</SText>
                    <SText fontSize={8} font={"Roboto"}>{diff_str}</SText>
                    {/* <SText fontSize={8} font={"Roboto"}>{"hace 3 horas"} {diff_minutes}</SText> */}
                </SView>
            </SView>

            <SHr />
        </SView>
        <SView col={"xs-12"} height={400} background={"#666"}>
            <SImage src={SSocket.api.root + "publicacion_" + obj.key} style={{
                resizeMode: "cover"
            }} />
        </SView>
        <SView col={"xs-11"}>
            <SHr height={8} />
            <SView row>
                <SIcon name={"Heart"} width={24} height={24} fill={STheme.color.secondary} />
                <SView width={16} />
                <SIcon name={"Comment"} f width={24} height={24} fill={STheme.color.secondary} />
            </SView>
            <SHr height={8} />
            <SText fontSize={11} font={"Roboto"}>{"123 me gusta"}</SText>
            <SHr height={4} />
            <SView row>
                <SText fontSize={12} bold font={"Roboto"}>{usuario_txt}</SText>
                <SView width={8} />
                <SText fontSize={12} font={"Roboto"} flex>{props?.data?.descripcion}</SText>
            </SView>
            <SHr height={4} />
            <SText fontSize={10} font={"Roboto"} color={STheme.color.gray}>{"Ver los 5 comentarios"}</SText>
            <SHr height={4} />
            <SText fontSize={9} font={"Roboto"} color={STheme.color.gray}>{"Agrega un comentario..."}</SText>
            <SHr height={8} />

        </SView>
    </SView>
}
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getBar = () => {
        const OPTIONS = [];
        var usuario = this.props?.state?.usuarioReducer?.usuarioLog;
        if (usuario) {
            OPTIONS.push({
                icon: "Add2",
                onPress: () => { SNavigation.navigate("client/add") }
            });
            OPTIONS.push({
                icon: "Chat",
                onPress: () => { SNavigation.navigate("login") }
            })

        } else {
            // OPTIONS.push({
            //     icon: "Alert",
            //     onPress: () => { SNavigation.navigate("login") }
            // })
        }

        return <TopBar options={OPTIONS} />
    }

    getLista() {
        var publicaciones = Models.publicacion.Actions.getAll(this.props);
        var usuarios = Usuario.Actions.getAll(this.props);
        // var usuarios = {}
        if (!publicaciones) return <SLoad />
        if (!usuarios) usuarios = {}

        return <SList
            center
            space={32}
            data={Object.values(publicaciones)}
            order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(obj => <Card data={obj} usuario={usuarios[obj.key_usuario]} />)}
        />

    }
    render() {
        return (
            <>
                {this.getBar()}
                <SPage title={'Home'} hidden>
                    {this.getLista()}
                </SPage>
                <BottomBar page={"home"} />
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Home);
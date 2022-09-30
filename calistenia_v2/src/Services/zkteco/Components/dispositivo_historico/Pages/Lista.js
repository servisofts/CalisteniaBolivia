import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import usuario from "../../../../../Pages/Usuario/"
import SSocket from 'servisofts-socket';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_dispositivo = SNavigation.getParam("key");
    }
    formatstr(nm) {
        var n = parseInt(nm);
        if (n < 10) {
            n = "0" + n;
        }
        return n + "";
    }
    getLista() {
        var data = Parent.Actions.getAll(this.key_dispositivo, this.props);
        var usuarios = usuario.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        if (!usuarios) return <SLoad />;
        return <STable2
            rowHeight={35}
            limit={100}
            header={[
                { key: "index", label: "#", width: 30 },
                //{ key: "key_dispositivo", label: "key_dispositivo", width: 100, },
                { key: "fecha_on", label: "Fecha", order: "desc", width: 150, render: (itm) => new SDate(itm).toString("yyyy-MM-dd hh:mm:ss") },
                { key: "data/key_usuario", label: "Usuario", width: 300, render: (itm) => usuarios[itm] ? usuarios[itm].Nombres + " " + usuarios[itm].Apellidos : "" },
                { key: "data-event", label: "EventType", width: 200, render: this.getEventType, center: true },
                {
                    key: "data/Time_second", label: "Hora en molinete", center: true, width: 150, render: (itm) => {
                        var anho = itm / 32140800 + 2000;
                        var mes = itm / 2678400 % 12 + 1
                        var dia = itm / 86400 % 31 + 1
                        var hora = itm / 3600 % 24
                        var minuto = itm / 60 % 60
                        var segundo = itm % 60
                        // return new SDate(new Date(itm * 1000)).toString();
                        return `${this.formatstr(anho)}-${this.formatstr(mes)}-${this.formatstr(dia)} ${this.formatstr(hora)}:${this.formatstr(minuto)}:${this.formatstr(segundo)}`
                    }
                },
            ]}
            filter={(obj) => {
                // if(!obj.key_usuario) return false;
                if (obj.data.EventType == "300" || obj.data.EventType == "301") {
                    return false;
                }
                return true;
            }}
            data={data}
        />
    }

    getEventType(obj) {
        var itm = obj.EventType;
        switch (itm) {
            case "0": return "Normal Punch Open";
            case "1": return "Punch during Normal Open Time Zone";
            case "2": return "First Card Normal Open";
            case "3": return "Multi-Card Open";
            case "4": return "Emergency Password Open";
            case "5": return "Open during Normal Open Time Zone";
            case "6": return "Linkage Event Triggered";
            case "7": return "Alarm Canceled";
            case "8": return "Remote Opening";
            case "9": return "Remote Closing";
            case "10": return "Disable Intraday Normal Open Time Zone";
            case "11": return "Enable Intraday Normal Open Time Zone";
            case "12": return "Open Auxiliary Output";
            case "13": return "Close Auxiliary Output";
            case "14": return "Press Fingerprint Open";
            case "15": return "Multi-Card Open";
            case "16": return "Press Fingerprint during Normal Open Time Zone";
            case "17": return "Card plus Fingerprint Open";
            case "18": return "First Card Normal Open";
            case "19": return "First Card Normal Open";
            case "20": return "Too Short Punch Interval";
            case "21": return "Door Inactive Time Zone";
            case "22": return "llegal Time Zone";
            case "23": return "Access Denied";
            case "24": return "Anti-Passback";
            case "25": return "Interlock";
            case "26": return "Multi-Card Authentication";
            case "27": return "Unregistered Card";
            case "28": return "Opening Timeout";
            case "29": return "Card Expired";
            case "30": return "Password Error";
            case "31": return "Too Short Fingerprint Pressing Interval";
            case "32": return "Multi-Card Authentication";
            case "33": return "Fingerprint Expired";
            case "34": return "Unregistered Fingerprint";
            case "35": return "Door Inactive Time Zone";
            case "36": return "Door Inactive Time Zone";
            case "37": return "Failed to Close during Normal Open Time Zone";
            case "101": return "Duress Password Open";
            case "102": return "Opened Accidentally";
            case "103": return "Duress Fingerprint Open";
            case "200": return "Door Opened Correctly";
            case "204": return "Normal Open Time Zone Over";
            case "205": return "Remote Normal Opening";
            case "206": return "Device Start";
            case "220": return "Auxiliary Input Disconnected";
            case "221": return "Auxiliary Input Shorted";
            case "300": return "Start";
            case "301": return "Stop";
            case "302": return "Sincronizacion exitosa";
            case "303": return "Sincronizacion fallida";
            default: return "NOT FOUND";
        }
    }
    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll>
                {this.getLista()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);
import { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, STable2 } from 'servisofts-component';
import Model from '../Model';

let arr = [];
const accumulator = {};
const stockSum = {};
var objFinal = {};

class testTablaUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getListas() {

    if (!arr) return;
    // arr.map((key) => {
    // var obj = arr[key];


    console.log("loco ", arr)
    // console.log("loco ", arr["A1"])


    Object.keys(arr).map((key, index) => {
      // console.log("loco ", key)
      Object.keys(key).map((item, index) => {
        console.log("loco ", item)

      })
    })

    // })
    // return (<SText>{data}</SText>);
  }

  getLista() {

    var data = Model.usuario.Action.getAll();
    if (!data) return <SLoad />

    // Object.keys(data).map((key) => {
    //   objFinal[key] = data[key];

    // });


    // console.log("todos los usuarios ", data.Nombres, " - ", data.Apellidos)




    return <STable2
      header={[
        { key: "index", label: "#", width: 40 },
        // { key: "Nombres", label: "Cliente nombre", width: 250, },

        // { key: "key_sad", label: "Cliente", width: 250, render: (item) => { return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}` } },
        // { key: "fecha_on", label: "Permisos", width: 150, order: "desc", render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },

        // { key: "fecha_on", label: "Roles", width: 150, order: "desc", render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },

        // { key: "fecha_on", label: "Sucursales", width: 150, order: "desc", render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },

        { key: "estado", label: "estado", width: 70, render: (a) => a == 1 ? "Activo" : "Anulado" },


      ]}
      // filter={(item) => {
      // item.estado != 0
      // return sucursal_usuario.Actions.isActive(item.key_sucursal, this.props)
      // return sucursal_usuario.Actions.isActive(item.key_sucursal, this.props)
      // }}
      limit={10}
      data={data}
    />
  }

  render() {
    // this.huesuda();
    return (
      <SPage title={'testAlvaro'}>

        {/* <SText>{'testAlvaro'}</SText> */}

        {this.getLista()}

      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(testTablaUsuarios);
import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SLoad, SPage, SText, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';

class ClientesComparacion extends Component {

  constructor(props) {
    super(props);
    this.state = {

      title: "Reporte Name",
      func: "_get_cliente_fecha_inicio",
      // params: "2023-03-01",
      // params: ["'" + pk + "'"],
      params: ["'2023-03-01'"],

    };

  }

  componentDidMount() {
    this.getData();
  }








  getData() {
    this.setState({ loading: "cargando", data: null });
    SSocket.sendPromise({
      component: "reporte",
      type: "execute_function",
      func: this.state.func,
      params: this.state.params,
    }).then(resp => {
      this.setState({ loading: false, data: resp.data });
    }).catch(e => {
      this.setState({ loading: false, error: e });
    })
  }
  getItem(data) {
    Object.keys(data).map(keys => {
      var obj = data[keys];
      // console.log(obj.key_usuario)
      return <>
        <SText style={{
          fontSize: 16,
          color: STheme.color.text,
        }}>{obj.key}  </SText>
      </>
    })
  }
  getLista() {
    if (!this.state.data) return <SLoad />


    // return Object.keys(this.state.data).map(keys => {
    //   var obj = this.state.data[keys];
    //   // console.log(obj.key_usuario)
    //   // return <>
    //   //   <SText style={{
    //   //     fontSize: 16,
    //   //     color: STheme.color.text,
    //   //   }}>{obj.key_usuario}</SText>
    //   // </>
    // })

    // const dado = ["code:"]

    // return <STable2
    //   limit={30}
    //   data={dado}
    //   cellStyle={{
    //     fontSize: 12,
    //     height: 30,
    //   }}
    //   header={[
    //     { key: "index", label: "#" },
    //     { width: 80, key: "key_usuario" },
    //     // { width: 80, key: "key_usuario" },
    //     // { width: 100, key: "numero_cuenta" },
    //   ]}
    // />
    // })


    const meses = [{ nombre: 'Enero', dias: 31 }, { nombre: 'Febrero', dias: 28 }, { nombre: 'Marzo', dias: 31 },];
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const fechaInicio = new Date('2023-01-01');
    const dias = [];

    // Generar array de fechas para los 3 meses
    for (let i = 0; i < meses.length; i++) {
      const mes = meses[i];
      for (let j = 1; j <= mes.dias; j++) {
        const fecha = new Date(fechaInicio);
        fecha.setMonth(i);
        fecha.setDate(j);
        dias.push(fecha);
      }
    }

    return (



      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', textAlign: 'center', width: '2em', marginLeft: '2em' }}></div>
          {dias.map((dia, index) => {
            const fechaStr = `${dia.getDate()} de ${meses[dia.getMonth()].nombre} de ${dia.getFullYear()}`;
            return (
              <div key={index} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', textAlign: 'center', width: '2em', marginLeft: '2em' }}>{fechaStr}</div>
            );
          })}
        </div>
        {diasSemana.map((dia, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ textAlign: 'center', width: '2em' }}>{dia}</div>
            {dias.map((dia, index) => (
              <div key={index} style={{ textAlign: 'center', width: '2em' }}></div>
            ))}
          </div>
        ))}
      </div>
    );



  }

  render() {


    return (
      <SPage title={'lista'} center disableScroll>
        <SText>comparacion</SText>
        <SHr height={24} color={"transparent"}></SHr>

        {this.getLista()}

        <SHr height={50} color={"transparent"}></SHr>
      </SPage >
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientesComparacion);
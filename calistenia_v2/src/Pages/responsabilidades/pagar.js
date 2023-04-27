import { Component } from 'react';

import { SDate, SHr, SPage, SText, STheme } from 'servisofts-component';
import { connect } from 'servisofts-page';
import SSocket from 'servisofts-socket';
import Container from '../../Components/Container';

const today = new Date();
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
const ultimoDia = lastDayOfMonth.getFullYear() + "-" + (lastDayOfMonth.getMonth() + 1) + "-" + lastDayOfMonth.getDate();


class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Cuentas por pagar",
      ano: 2023,
      fecha_inicio: "2013-01-01",
      fecha_fin: "2023-12-31",

      mes: new SDate().getMonth(),
      func: "_get_cliente_fecha_veces_inscripto",
      parametros: {
        "inicio": new SDate().toString("yyyy-MM-dd"),
        "fin": new SDate(ultimoDia).toString("yyyy-MM-dd"),
        "cantidad": 1,
      },
      ...this.state,

    }
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    var _from = new SDate("2013-01-01").toString("yyyy-MM-dd");
    var _to = new SDate().toString("yyyy-MM-dd");

    this.setState({ loading: "cargando", data: null });
    SSocket.sendPromise({
      component: "reporte",
      type: "execute_function",
      func: this.state.func,
      params: ["'" + _from + "'", "'" + _to + "'"],
      ...this.params
    })
      .then((resp) => {
        this.setState({ loading: false, data: resp.data });
      })
      .catch((e) => {
        this.setState({ loading: false, error: e });
      });
  }

  render() {

    return <>
      <SPage title={this.state.title} center backgroundColor={"transparent"}>

        <Container>
          <SText fontSize={36} font={"Roboto"} bold color={STheme.color.text} center>{this.state.title} </SText>
          <SHr height={40} />

        </Container>
      </SPage>

    </>
  }
}
export default connect(index);
import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SLoad, SPage } from 'servisofts-component';
import { MenuPages } from 'servisofts-rn-roles_permisos';
import { Parent } from ".";
import Model from '../../Model';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    let empresa = Model.empresa.Action.getSelect();
    let gestion = Model.gestion.Action.getSelect();
    if (!empresa) return <SLoad />

    let fecha = new SDate();
    let fecha_inicio = fecha.toString("yyyy-MM-dd");
    fecha.addMonth(1).addDay(-1);
    let fecha_fin = fecha.toString("yyyy-MM-dd");
    return (
      <SPage title={Parent.title} onRefresh={(end) => {
        Model.usuarioPage.Action.CLEAR();
        end()
      }}>
        <SHr height={32} />
        <MenuPages path={Parent.path + "/"}
          // blackList={["/fidelizacion/historial"]}
          params={{
            // key_empresa: empresa.key,
            fecha_fin: fecha_fin,
            fecha_inicio: fecha_inicio,
          }}
          onPress={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >

        </MenuPages>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(index);
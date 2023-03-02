import { Component } from 'react';
import { SHr, SNavigation, SPage, STheme, SView, SText, SLoad } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { PlanDeCuentasTable } from 'servisofts-rn-contabilidad';
import Model from '../../Model';
// import { PlanDeCuentasTable } from 'servisofts-rn-contabilidad'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fecha_inicio: "2023-01-01",
            fecha_fin: "2024-01-01",
        }
    }

    componentDidMount() {


    }
    getData() {
        this.empresa = Model.empresa.Action.getSelect();
        if (!this.empresa) return null;
        if (this.state.loading) return null;
        if (this.state.data) return this.state.data;
        this.setState({ loading: "cargando..." });
        Model.asiento_contable_detalle.Action.getByFecha({
            fecha_inicio: this.state.fecha_inicio,
            fecha_fin: this.state.fecha_fin,
            key_empresa: this.empresa.key
        }).then(resp => {
            this.setState({ loading: false, data: resp.data });
        }).catch(e => {
            this.setState({ loading: false });
        })
        return null;
    }

    loadData() {
        if (!this.getData()) return <SLoad />
        let arr_data = Object.values(this.state.data);
        return <PlanDeCuentasTable width={600} itemProps={{ underline: true }}
            witheList={["4", "5"]}
            allowExport
            excelName={`ESTADO_DE_RESULTADOS_CALISTENIA_${this.state.fecha_inicio}_${this.state.fecha_fin}`}
            renderTotal={(obj) => {
                var total = 0;
                let arr2 = arr_data.filter(o => o.codigo.startsWith(obj.codigo));
                arr2.map((oa) => total += (oa.debe ?? 0) - (oa.haber ?? 0))
                return total;
            }} />
    }
    render() {

        return (<SPage title={"Estado de resultados"} disableScroll center>
            {this.loadData()}
        </SPage>)
    }
}
export default connect(index);
import { Component } from 'react';
import { connect } from 'react-redux';
import { SImage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getNoSelect() {
    if (!this.props.onSelect) return null;
    if (this.props.select) return null;
    return <SView col={"xs-12"} height backgroundColor={"#00000099"} style={{
      position: "absolute",
    }} center onPress={() => {
      this.props.onSelect(this.props.obj);
    }}>
      <SText fontSize={18} bold>Activar</SText>
    </SView>
  }
  render() {
    return (
      <SView width={120} height={110}>
        <SView width={120} height={100} style={{
          borderRadius: 10,
          borderWidth: 1,
        }} center backgroundColor={STheme.color.card} onPress={() => {
          this.props.deSelect(this.props.obj);
        }}>
          <SView col={"xs-12"}
            height={70}
          >
            <SImage src={SSocket.api.root + "sucursal/" + this.props.obj.key} />
          </SView>
          <SView col={"xs-12"} flex center>
            <SText fontSize={13} bold>{this.props.obj.descripcion}</SText>
          </SView>
          {this.getNoSelect()}
        </SView >
      </SView >
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Item);
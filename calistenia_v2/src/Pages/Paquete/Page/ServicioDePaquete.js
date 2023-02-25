import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SImage, SLoad, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Servicio from '../../Servicio';

const ServicioDePaquete = (props) => {
  const [select, setSelect] = React.useState(false);
  let data = Servicio.Actions.getAll(props);
  if (!data) return <SLoad />
  const getLista = () => {
    let data_p = {};
    if (props.keyPaquete) {
      let reducer_p = props.state.paqueteServicioReducer;
      data_p = reducer_p.data;
      // console.log(data_p);
      if (!reducer_p.data) {
        if (reducer_p.estado == "cargando") return <ActivityIndicator color={STheme.color.text} />
        if (reducer_p.estado == "error") return <Text>ERROR</Text>
        var object = {
          component: "paqueteServicio",
          type: "getAll",
          estado: "cargando",
          key_paquete: props.keyPaquete,
          key_usuario: props.state.usuarioReducer.usuarioLog.key,
        }
        SSocket.send(object);
        return <View />
      }
      if (!select) {
        data_p = Object.values(data_p).find(x => x.key_paquete == props.keyPaquete);
        setSelect(data_p);
        props.onChange(select);
      }

    } else {
      if (!select) {
        setSelect({});
      }
    }

    var Lista = Object.keys(data).map((key) => {
      var obj = data[key];
      var isActivo = false;
      if (select[key]) {
        isActivo = true;
      }

      return <TouchableOpacity style={{
        width: 160,
        height: 140,
        margin: 8,
        borderRadius: 10,
        borderWidth: 1,
        
        backgroundColor: STheme.color.card,
        // padding:4,

      }}
        onPress={() => {
          if (props.keyPaquete) {
            if (!select[key]) {
              var object = {
                component: "paqueteServicio",
                type: "registro",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando",
                data: {
                  key_paquete: props.keyPaquete,
                  key_servicio: key,
                }
              }
              SSocket.send(object);
            } else {
              var object = {
                component: "paqueteServicio",
                type: "editar",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando",
                data: { ...select[key], estado: 0 }
              }
              SSocket.send(object);
            }
          } else {
            if (select[key]) {
              delete select[key];
            } else {
              select[key] = obj;
            }
            setSelect({ ...select });
            props.onChange(select);
          }


        }}>
        <View style={{
          flex: 1
        }}>
          <View style={{
            padding: 8,
            
            height: 120,
            borderRadius: 8,
            overflow: "hidden"
          }}>
            <SImage src={SSocket.api.root + "servicio/" + obj.key} />
          </View>
          <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              color: STheme.color.secondary
            }}>{obj.descripcion}</Text>
          </View>
        </View>
        {(isActivo ? <View /> : <View style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: 8,
          backgroundColor: "#000000dd",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{
            fontSize: 20,
            color: STheme.color.text,
            fontWeight: "bold"
          }}>Activar</Text>
        </View>)}
      </TouchableOpacity>
    })
    return <View style={{
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    }}>
      {Lista}
    </View>
  }

  return <View style={{
    marginTop: 16,
    width: "100%",
    borderRadius: 8,
    // padding: 8,
    minHeight: 220,
    marginBottom: 32,

  }}>
    <Text style={{
      padding: 8,
      fontSize: 12,
      color: "#999",
      width: "100%",
      textAlign: "center"
    }}>Servicios que incluye el paquete:</Text>
    {getLista()}
  </View>
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ServicioDePaquete);
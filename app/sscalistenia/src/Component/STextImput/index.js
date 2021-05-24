import React, { Component } from 'react';
import { TextInput } from 'react-native';
import IntlPhoneInput from './NumberPhone/IntlPhoneInput';


class STextImput {
    propiedades;
    value;
    propsTemp = {};
    constructor(_props) {
        this.propiedades = _props;
        this.value = "";
        if (_props.defaultValue) {
            this.value = _props.defaultValue;
        }
        if (_props.value) {
            this.value = _props.value;
        }



    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    setError() {
        if (!this.propsTemp.style) {
            this.propsTemp.style = this.propiedades.style;
        }
        this.propiedades.style = {
            ...this.propiedades.style,
            borderColor: "#ff0000"
        }
        return false;
    }
    verify() {
        if (!this.value) {
            if (!this.propsTemp.style) {
                this.propsTemp.style = this.propiedades.style;
            }
            this.propiedades.style = {
                ...this.propiedades.style,
                borderColor: "#BE223A"
            }
            return false;
        }
        if (this.propiedades.type == "Email") {
            var aux = this.value.replace(/\s*$/, "");
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(aux) === false) {
                // if (!this.propsTemp.style) {
                //     this.propsTemp.style = this.propiedades.style;
                // }
                // this.propiedades.style = {
                //     ...this.propiedades.style,
                //     borderColor: "#BE223A"
                // }
                // return false
            }
        }
        if (this.propsTemp.style) {
            this.propiedades.style = { ...this.propsTemp.style };
            this.propsTemp.style = false;
        }
        return this.value;
    }
    focus() {
        this._ref.focus();
    }
    getComponent() {
        var INSTANCE = this;
        if (this.propiedades.type == "Phone") {
            return <IntlPhoneInput
                containerStyle={{
                    ...this.propiedades.style

                }}
                phoneInputStyle={{
                    flex: 1,
                    // width:"100%",
                    color: "#fff",
                    height: "100%",
                    padding: 0,
                    outline: "none"
                }}
                inputProps={
                    { placeholderTextColor: "#00a5ce00" }
                }
                defaultCountry="BO"
                lang="en"
                placeholderTextColor={'#666'}
                // onChangeText={onChangeText}
                onChangeText={(text) => {
                    INSTANCE.value = text.dialCode + " " + text.phoneNumber;
                }}
            />
        }
        return (<TextInput
            ref={(ref) => this._ref = ref}
            placeholderTextColor={'#666'}
            onChangeText={(text) => {
                this.value = text;
                this.value = this.value.trim();
                if (this.propiedades.type == "Email") {
                    this.verify();
                }
            }}
            {...this.propiedades}
            style={{ ...this.propiedades.style, outline: "none" }}
        />)
    }
}
export default STextImput;
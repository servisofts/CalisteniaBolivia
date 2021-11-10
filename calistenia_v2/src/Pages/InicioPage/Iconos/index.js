import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { SHr, SImage, SLoad, SNavigation, SText, SThread, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import { SSRolesPermisosGetPages, SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import Item from './Item';

export default class Iconos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };
    }
    startAnimation() {
        this.onAnim = true;
        Animated.loop(
            Animated.timing(this.state.anim, {
                toValue: 1,
                delay: 0,
                easing: Easing.linear,
                duration: 200,
                useNativeDriver: true,
            }),
            { iterations: 1000 },
        ).start();
    }
    inAnim() {
        return this.onAnim;
    }
    stopAnimation() {
        this.onAnim = false;
        this.state.anim.stopAnimation();
        this.state.anim.setValue(0);
    }
    getPaginas() {
        var pages = SSRolesPermisosGetPages();
        if (!pages) {
            return <SLoad />
        }
        return Object.keys(pages).map((key) => {
            var obj = pages[key];
            // console.log(obj)
            if (!obj.is_page) {
                return null;
            }
            if (!SSRolesPermisosValidate({ page: obj.url, permiso: "ver" })) {
                return null;
            }
            var urlImage = SSocket.api.rp + "page/" + obj.key;
            return <Item obj={obj} urlImage={urlImage} animMove={this.state.anim}
                startAnim={() => {
                    // this.startAnimation();
                }}
                inAnim={()=>this.inAnim()}
                stopAnimation={this.stopAnimation} />

        });
    }
    render() {
        return (
            this.getPaginas()
        );
    }
}

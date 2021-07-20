import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import SAPanResponder from '../../../SAnimated/SAPanResponder';
import { SText } from '../../../SText';
import { SView } from '../../../SView';

export default class SHeaderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.animSelect = new Animated.Value(0);
        this.anim = new Animated.ValueXY({ x: this.props.obj.width, y: 0 });
        this.pan = new SAPanResponder({
            onGrand: (e, gs) => {
                this.startWidth = this.layout.width;
                this.anim.flattenOffset();
                this.anim.setOffset({
                    x: this.anim.x._value,
                    y: this.anim.y._value
                });
                this.scroll.setEnabled(false)
            },
            onMove: (e, gs) => {
                var layoutParent = this.scroll.getLayout();
                console.log(this.props.layoutParent())
                console.log(this.layout)
                console.log({ moveX: gs.moveX, dx: gs.dx, x0: gs.x0 })
                this.anim.setValue({ x: gs.dx, y: 0 })
                // if (gs.moveX < 50) {
                //     this.scroll.scrollIncrement({ x: -2, y: 0 })
                // }
                // if (gs.moveX > layoutParent.width - 50) {
                //     this.scroll.scrollIncrement({ x: +2, y: 0 })
                // }
            },
            onRelease: () => {
                this.props.changeSize(this.layout.width + 1 - this.startWidth)
                // this.anim.extractOffset();
                this.scroll.setEnabled(true)
            }
        });

        this.animPosition = new Animated.ValueXY({ x: 0, y: 0 });
        this.panMove = new SAPanResponder({
            onGrand: (e, gs) => {
                this.startPosition = {
                    x: this.animPosition.x._value,
                    y: this.animPosition.y._value
                }
                this.animPosition.flattenOffset();
                this.animPosition.setOffset({
                    x: this.animPosition.x._value,
                    y: this.animPosition.y._value
                });
                this.animSelect.setValue(10);
                this.scroll.setEnabled(false)
            },
            onMove: (e, gs) => {
                this.animPosition.setValue({ x: gs.dx, y: 0 })
                this.props.onMove(gs);
            },
            onRelease: () => {
                new Animated.timing(this.animPosition, {
                    toValue: this.startPosition,
                    duration: 100,
                }).start();
                this.animSelect.setValue(1);
                this.scroll.setEnabled(true)
                // this.props.changeSize(this.layout.width + 1 - this.startWidth)
            }
        });
    }
    getLayout() {
        return this.layout
    }
    setLayout(layout) {
        this.layout = {
            ...this.layout,
            ...layout
        }
    }
    setLastMoved(ref) {
        this.lastMoved = ref;
    }
    getLastMoved() {
        return this.lastMoved;
    }
    onMoveBrother(ref, gs) {
        var layoutP = ref.getLayout();
        var p = gs.dx + layoutP.x + (layoutP.width / 2)
        var mp = this.layout.x;


        if (p > mp && p < mp + this.layout.width / 2) {
            console.log(this.props.obj.label)
            var lastMoved = ref.getLastMoved()
            var prevLayout = {
                ...this.layout
            }
            this.layout.x = !lastMoved ? (layoutP.x - this.layout.x) : (layoutP.x - lastMoved.x);
            ref.setLastMoved(prevLayout);
            new Animated.timing(this.animPosition, {
                toValue: this.layout.x,
                duration: 100,
            }).start();
        }
    }
    render() {
        this.scroll = this.props.getScroll();
        return (
            <SView props={{
                direction: "row",
                animated: true,
            }}
                onLayout={(evt) => { this.layout = evt.nativeEvent.layout }}
                style={{
                    width: this.anim.x,
                    height: "100%",
                    zIndex: this.animSelect,
                    transform: [
                        { translateX: this.animPosition.x }
                    ]
                }}>
                <SView
                    {...this.panMove.getPanHandlers()}
                    props={{
                        customStyle: "primary",
                        animated: true,
                        variant: "center",
                    }} style={{
                        flex: 1,
                        height: "100%",

                    }}>
                    <SText options={{
                    }} style={{
                        textAlign: "center"
                    }}>
                        {this.props.obj.label}
                    </SText>

                </SView>
                <SView
                    {...this.pan.getPanHandlers()}
                    props={{
                        customStyle: "secondary",
                        animated: true
                    }}
                    style={{
                        width: 10,
                        height: "100%",
                        cursor: "cell"
                    }}></SView>
            </SView>
        );
    }
}



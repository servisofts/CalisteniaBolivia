import React, { Component } from 'react';

type _Props = {
    size: "Letter" | "Legal"
}
const PagesSize = {
    Letter: { width: 220, height: 280 },//mm
    Legal: { width: 220, height: 360 }, //mm
}
class SPdf extends Component<_Props> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }
    cropImage(img: any, h: any, y: any) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = h;
        const ctx: any = canvas.getContext('2d');
        ctx.drawImage(img, 0, y, img.width, img.height, 0, 0, img.width, img.height);
        return canvas.toDataURL('image/png');
    }

    imprimir() {

    }
    render() {
        let size = PagesSize[this.props.size];
        return <div id="recibo" style={{
            width: size.width + "mm",
        }}>
        </div>
    }
}

export default SPdf;
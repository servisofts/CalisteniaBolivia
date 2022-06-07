import React, { Component } from 'react';

import jspdf from 'jspdf'
import Html2Canvas from 'html2canvas'
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
        ctx.drawImage(img, 0, y, img.width,img.height , 0, 0, img.width, img.height);
        return canvas.toDataURL('image/png');
    }

    imprimir() {
        const input: any = document.getElementById('recibo');
        let size = PagesSize[this.props.size];
        Html2Canvas(input, { scrollY: 0, scrollX: 0, }).then((canvas) => {

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf('p', 'mm', [size.width, size.height]);
            console.log("canvas.width", canvas.width);
            console.log("canvas.height", canvas.height);
            console.log("pdf.width", pdf.internal.pageSize.getWidth());
            console.log("pdf.height", pdf.internal.pageSize.getHeight());
            const ratio = canvas.width / pdf.internal.pageSize.getWidth();
            console.log("ratio", ratio);
            let space = 10;
            const imgHeight = (pdf.internal.pageSize.getHeight() * ratio);
            console.log("imgHeight", imgHeight);
            var npages = Math.ceil(canvas.height / imgHeight);

            for (var i = 0; i < npages; i++) {
                var imgTemp = this.cropImage(canvas, imgHeight, imgHeight * i);
                pdf.addImage(imgTemp, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), imgHeight/ratio);
                if (i < npages - 1) {
                    pdf.addPage();
                }
            }
            // const imgWidth = pdf.internal.pageSize.getWidth();
            // const pageHeight = pdf.internal.pageSize.getHeight();
            // const imgHeight = canvas.height * imgWidth / canvas.width;
            // const heightLeft = imgHeight;
            // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pageHeight);

            // pdf.save('recibo.pdf');
            window.open(pdf.output("bloburl"), '_blank');
        });
    }
    render() {
        let size = PagesSize[this.props.size];
        return <div id="recibo" style={{
            width: size.width + "mm",
        }}>
            {this.props.children}
        </div>
    }
}

export default SPdf;
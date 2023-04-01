import { Component } from 'react';
import { connect } from 'react-redux';
import { SInput, SPage, SText } from 'servisofts-component';
import * as xlsx from 'xlsx';

let arr = [];
const accumulator = {};
const stockSum = {};

class testAlvaro extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  huesuda() {

    if (!arr) return;
    // arr.map((key) => {
    // var obj = arr[key];


    console.log("loco ", arr)
    // console.log("loco ", arr["A1"])


    Object.keys(arr).map((key, index) => {
      // console.log("loco ", key)
      Object.keys(key).map((item, index) => {
        console.log("loco ", item)

      })
    })

    // })
    // return (<SText>{data}</SText>);
  }


  render() {
    // this.huesuda();
    return (
      <SPage title={'testAlvaro'}>

        <SText>{'testAlvaro'}</SText>

        <SInput type={"file"} customStyle={"calistenia"} col={"xs-6"} onChangeText={async (files) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = xlsx.read(data, { type: 'array' });
            arr = workbook.Sheets;
            const sheets = workbook.SheetNames;


            // for (const sheetName of sheets) {
            //   const product = sheets[`A`]; // El nombre del producto se encuentra en la columna A
            //   const quantity = sheets[`B`]; // La cantidad de stock se encuentra en la columna B

            //   if (stockSum[product]) {
            //     stockSum[product] += quantity;
            //   } else {
            //     stockSum[product] = quantity;
            //   }

            // }

            // console.log(stockSum); // Imprime el objeto en la consola

            // for (let product in stockSum) {
            //   console.log(`El producto ${product} tiene ${stockSum[product]} unidades en stock.`); // Muestra cada producto y su cantidad de stock
            // }



            for (const sheetName of sheets) {
              const sheet = workbook.Sheets[sheetName];
              const cells = xlsx.utils.sheet_to_json(sheet, { header: 1 });
              // console.log(sheet);
              for (const row of cells) {
                for (const cell of row) {
                  console.log(cell);
                }
              }
            }
          };
          reader.readAsArrayBuffer(files[0].file);

        }
        } />

      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(testAlvaro);
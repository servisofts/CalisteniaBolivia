export default {
    fk: [],
    metas: [
        { key: "key", label: "Key", type: "pk", width: 150, hidden: true },
        { key: "descripcion", label: "Descripcion", type: "text", width: 150 , required:true},
        { key: "observacion", label: "Observacion", type: "text", width: 250 },
        { key: "tipo", label: "Tipo", type: "text", width: 100, required:true },
    ]
}
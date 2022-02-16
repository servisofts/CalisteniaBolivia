export default {
    fk: [],
    metas: [
        { key: "key", label: "Key", type: "text", width: 150, hidden: true },
        { key: "descripcion", label: "Descripcion", type: "text", width: 150, required: true },
        { key: "observacion", label: "Observacion", type: "text", width: 250 },
        { key: "key_tipo_comision", label: "key_tipo_comision", type: "text", width: 150, required: true },
        { key: "monto_maximo", label: "monto_maximo", type: "money", width: 150, required: true },
        { key: "comision", label: "comision", type: "number", width: 150, required: true },
        { key: "fecha_inicio", label: "fecha_inicio", type: "date", width: 150, required: true },
        { key: "fecha_fin", label: "fecha_fin", type: "date", width: 150, required: true },
    ]
}
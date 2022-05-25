export default {
    fk: ["key_paquete_venta_usuario"],
    metas: [
        { key: "key", label: "Key", type: "pk", width: 150, hidden: true },
        { key: "descripcion", label: "Motivo", type: "textArea", width: 150, required: true },
        { key: "dias", label: "Dias", type: "number", width: 100, required: true },
    ]
}
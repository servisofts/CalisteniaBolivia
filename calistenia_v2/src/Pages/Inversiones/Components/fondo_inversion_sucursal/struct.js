export default {
    fk: ["key_fondo_inversion"],
    metas: [
        { key: "key", label: "Key", type: "text", width: 150, hidden: true },
        { key: "key_sucursal", label: "key_sucursal", type: "text", width: 150, required: true },
        { key: "key_fondo_inversion", label: "key_fondo_inversion", type: "text", width: 150, required: true ,},
    ]
}
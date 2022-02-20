export default {
    fk: ["key_fondo_inversion"],
    metas: [
        { key: "key", label: "Key", type: "text", width: 150, hidden: true },
        { key: "key_fondo_inversion", label: "key_fondo_inversion", type: "text", width: 150, required: true, hidden: true },
        { key: "key_usuario_inversionista", label: "key_usuario_inversionista", type: "text", width: 150, required: true, hidden: true },
        { key: "inversion", label: "inversion", type: "money", width: 150, required: true },
        { key: "fecha_aprovacion", label: "fecha_aprovacion", type: "date", width: 150, required: false, hidden: true },
    ]
}
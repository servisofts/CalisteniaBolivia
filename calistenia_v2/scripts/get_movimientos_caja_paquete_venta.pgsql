SELECT
    *
FROM
    caja_movimiento
WHERE
    caja_movimiento.data->>'key_paquete_venta_usuario' = '74f3deca-00c7-4839-a4af-e17a11ced7e2'
LIMIT 100

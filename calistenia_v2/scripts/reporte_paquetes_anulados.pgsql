SELECT
    paquete_venta_usuario.*,
    array_to_json(array_agg(caja_movimiento.*)) as movimientos_caja
FROM
    paquete_venta,
    paquete_venta_usuario,
    caja_movimiento
WHERE
    paquete_venta.key = paquete_venta_usuario.key_paquete_venta
    AND paquete_venta.estado <> 1
    AND caja_movimiento.data ->> 'key_paquete_venta_usuario' = paquete_venta_usuario.key
GROUP BY
    paquete_venta_usuario.key

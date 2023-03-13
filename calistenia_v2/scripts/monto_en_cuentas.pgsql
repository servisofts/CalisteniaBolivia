SELECT
    -- sucursal.key AS key_sucursal,
    cuenta_banco.key,
    cuenta_banco.codigo,
    SUM(round(CAST(cuenta_banco_movimiento.monto AS numeric), 2)) AS total,
    SUM(
        CASE WHEN cuenta_banco_movimiento.monto > 0 THEN
            round(CAST(cuenta_banco_movimiento.monto AS numeric), 2)
        ELSE
            0
        END) AS total_ingresos,
    SUM(
        CASE WHEN cuenta_banco_movimiento.monto < 0 THEN
            round(CAST(cuenta_banco_movimiento.monto AS numeric), 2)
        ELSE
            0
        END) AS total_egresos
FROM
    cuenta_banco_movimiento
LEFT JOIN cuenta_banco ON cuenta_banco_movimiento.key_cuenta_banco = cuenta_banco.key
LEFT JOIN sucursal ON cuenta_banco_movimiento.key_sucursal = sucursal.key
WHERE cuenta_banco_movimiento.estado <> 0
GROUP BY
    cuenta_banco.key
    -- sucursal.key

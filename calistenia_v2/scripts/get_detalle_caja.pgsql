SELECT
    -- sum(tabla.monto) AS monto
    *
FROM (
    SELECT
        sum(round( CAST(caja_movimiento.monto as numeric), 2)) AS monto,
        caja.key,
        caja.fecha_on
    FROM
        caja,
        caja_movimiento
    WHERE
        caja.key_sucursal = 'ff7f8192-ff66-4e97-8a8e-23daefe57743'
        -- AND caja.fecha_off IS NOT NULL
        AND caja_movimiento.key_caja = caja.key
        AND caja_movimiento.estado <> 3
    GROUP BY
        caja.key
    ORDER BY
        (caja.fecha_on) DESC) tabla
WHERE
    tabla.monto <> 0
-- 74f3deca-00c7-4839-a4af-e17a11ced7e2
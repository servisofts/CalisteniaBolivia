SELECT
    jsonb_object_agg(obj.key, to_json(obj.*))
FROM (
    SELECT
        sucursal.key,
        sucursal.descripcion,
        sum(round(CAST(caja_movimiento.monto AS numeric), 2)) AS monto
        -- caja_movimiento.key_caja,
        -- caja_movimiento.descripcion,
    FROM
        caja,
        caja_movimiento,
        sucursal
    WHERE
        caja.key_sucursal = sucursal.key
        AND caja.key = caja_movimiento.key_caja
        AND caja_movimiento.estado <> 3
        -- AND caja_movimiento.key_caja_tipo_movimiento <> '6'
    GROUP BY
        (sucursal.key)
        -- ORDER BY caja_movimiento.fecha_on desc
        -- LIMIT 100
) obj

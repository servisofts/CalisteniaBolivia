import moment from "moment"

export const SFechaFormat = (fecha) => {
    var date = new Date(fecha);
    if (isNaN(date.getTime())) {
        return "--";
    }
    var fecha = moment(fecha).format("YYYY/MM/DD hh:mm");
    return fecha;
}
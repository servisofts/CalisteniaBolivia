export const SF = {
    formatMoney: (number) => {
        if(number === null || number === undefined) return 0;
        // return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        return number.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    }
}
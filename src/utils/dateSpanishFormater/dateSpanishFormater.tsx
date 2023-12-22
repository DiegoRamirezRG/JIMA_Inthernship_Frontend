export const formatDayDate = (day : string) => {
    const dayMap: { [key: string]: string } = {
        'Mon': 'Lunes',
        'Tue': 'Martes',
        'Wed': 'Miércoles',
        'Thu': 'Jueves',
        'Fri': 'Viernes',
        'Sat': 'Sábado',
        'Sun': 'Domingo',
    };  

    return dayMap[day] || day;
}

export const formatMonthDate = (month: string) => {
    const monthMap: { [key: string]: string } = {
        '01': 'Enero',
        '02': 'Febrero',
        '03': 'Marzo',
        '04': 'Abril',
        '05': 'Mayo',
        '06': 'Junio',
        '07': 'Julio',
        '08': 'Agosto',
        '09': 'Septiembre',
        '10': 'Octubre',
        '11': 'Noviembre',
        '12': 'Diciembre',
    };

    return monthMap[month] || month;
}

export const formatDateFromNumber = (month: number) => {
    const monthMap: { [key: number]: string } = {
        1: 'Enero',
        2: 'Febrero',
        3: 'Marzo',
        4: 'Abril',
        5: 'Mayo',
        6: 'Junio',
        7: 'Julio',
        8: 'Agosto',
        9: 'Septiembre',
        10: 'Octubre',
        11: 'Noviembre',
        12: 'Diciembre',
    };

    return monthMap[month] || month;
}
const formatDate = (date, mod) => {
    const d = new Date(date);

    if (!mod) {
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ]

        const days = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
        ]


        const dayOfMonth = d.getDate()
        const month = months[d.getMonth()]
        const year = d.getFullYear()
        const dayOfWeek = days[d.getDay()]

        const hours = d.getHours().toString().padStart(2, '0')
        const minutes = d.getMinutes().toString().padStart(2, '0')

        const timeString =
            hours !== '00' || minutes !== '00' ? `, ${hours}:${minutes}` : ''

        return `${dayOfWeek}, ${dayOfMonth} de ${month} de ${year}${timeString}`
    } 
    else if (mod === "short") {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
    
        return `${day}/${month} (${hours}:${minutes})`;
    }
    else if (mod === "local") {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); 
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
}
export default formatDate


// Creamos la función calcular el semestre:
function calcularSemestre() {        
    // Creamos los espacios para las fechas
    const fecha1 = document.getElementById("startDate").value;
    const fecha2 = document.getElementById("endDate").value;
    const inHabilesInput = document.getElementById("inhabilDates").value;

    // 
    if (fecha1 && fecha2) {
        // Convertimos las fechas en valores de tiempo
        const inicio = new Date(fecha1);
        const final = new Date(fecha2);

        //! Nos aseguramos que no son el mismo día:
        if (final < inicio) {
            document.getElementById('semestreResult').innerText = "La fecha de cierre debe de ser posteriror"
        }

        // ? Almacenamos los datos inhabiles:
        const inhabilDias = inHabilesInput.split(',').map(date => new Date(date.trim()));
        // ? indicamos cuantos dias habiles tenemos
        let diasHabiles = 0;
        // ? Le pasamos la variable de inicio para recorrer cada día hasta la fecha de final
        let actual = new Date(inicio);

        // ? Contamos cada día desde la fecha de inicio hasta la fecha final
        // ? Esto para excluir los fines de semana y posterirormente los días sin clase
        while (actual <= final) {
            // 
            const diaSemana = actual.getDay();

            // Verificamos si el día es habil o no:
            const noEsHabil = inhabilDias.some(
                inhabilDias => actual.toDateString() === inhabilDias.toDateString()
                );

            // Solo contamos si no es fin de semana
            if (diaSemana !== 0 && diaSemana !== 6) {
                diasHabiles ++;
            }
            // Avanzamos al sigueente día:
            actual.setDate(actual.getDate() + 1);
        }
        
        // ? Mostramos el peridodo:
        document.getElementById("semestreResult").innerText 
            = `La cantidad de dáis es: ${diasHabiles}`;
    } else {
        document.getElementById('semestreResult').innerText 
            = `Ingresa las fechas`;
    }
}


/*
// Creamos la función calcular el semestre:
function calcularSemestre() {        
    // Creamos los espacios para las fechas
    const fecha1 = document.getElementById("startDate").value;
    const fecha2 = document.getElementById("endDate").value;
    const inHabilesInput = document.getElementById("inhabilDates").value;

    // Comprobamos que se hayan ingresado ambas fechas
    if (!fecha1 || !fecha2) {
        document.getElementById('semestreResult').innerText = "Ingresa ambas fechas";
        return; // Salimos de la función
    }

    // Convertimos las fechas en valores de tiempo
    const inicio = new Date(fecha1);
    const final = new Date(fecha2);

    // Nos aseguramos que la fecha de cierre sea posterior a la de inicio
    if (final <= inicio) {
        document.getElementById('semestreResult').innerText = "La fecha de cierre debe ser posterior a la fecha de inicio.";
        return; // Salimos de la función
    }

    // Almacenamos los datos inhabilitados:
    const inhabilDias = inHabilesInput.split(',').map(date => new Date(date.trim()));
    
    // Indicamos cuántos días hábiles tenemos
    let diasHabiles = 0;
    
    // Le pasamos la variable de inicio para recorrer cada día hasta la fecha final
    let actual = new Date(inicio);

    // Contamos cada día desde la fecha de inicio hasta la fecha final
    // Esto para excluir los fines de semana y posteriormente los días sin clase
    while (actual <= final) {
        const diaSemana = actual.getDay();

        // Verificamos si el día es inhabil o no:
        const esInhabil = inhabilDias.some(inhabilDia => actual.toDateString() === inhabilDia.toDateString());

        // Solo contamos si no es fin de semana y no es un día inhabil
        if (diaSemana !== 0 && diaSemana !== 6 && !esInhabil) {
            diasHabiles++;
        }
        
        // Avanzamos al siguiente día:
        actual.setDate(actual.getDate() + 1);
    }
    
    // Mostramos el periodo:
    document.getElementById("semestreResult").innerText = `La cantidad de días hábiles es: ${diasHabiles}`;
}

*/
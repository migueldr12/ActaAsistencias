"use strict";
new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data: () => ({
        showForm: true,
        valid: false,
        diasSemana: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        horas: {
            Lunes: '',
            Martes: '',
            Miércoles: '',
            Jueves: '',
            Viernes: ''
        },
        horasPorDiaOptions: [0, 1, 2, 3, 4, 5],
        erroresHoras: {
            Lunes: '',
            Martes: '',
            Miércoles: '',
            Jueves: '',
            Viernes: ''
        },
        periodoInicio: "",
        periodoFin: "",

        inicioP1: "",
        finalP1: "",
        inicioP2: "",
        finalP2: "",
        inicioP3: "",
        finalP3: "",

        vacaciones: '',
        vacacionesOptions: ['Sí', 'No'],
        inicioVacaciones: '',
        finVacaciones: '',
        diasAsueto: 0,
        diasAsuetoInputs: [],
        cantidadAlumnos: "",
        nombreGrupo: "",
        nombreMateria: "",
        nombreDocente: "",
        alumnos: "",
        dias: "",
        errores: {
            periodoInicio: '',
            periodoFin: '',
            primeraEvaluacion: "",
            segundaEvaluacion: "",
            terceraEvaluacion: "",
            vacaciones: '',
            inicioVacaciones: '',
            finVacaciones: '',
            diasAsueto: '',
            cantidadAlumnos: '',
            nombreGrupo: '',
            nombreMateria: '',
            nombreDocente: ''
        }
    }),
    methods: {
        generarInputsAsueto() {
            // Si ya hay datos, reiniciar el arreglo
            this.diasAsuetoInputs = [];

            // Verificar si el valor de "diasAsueto" excede el límite de 10
            if (this.diasAsueto > 10) {
                // Mostrar un mensaje de advertencia
                alert("No es posible tener más de 10 días de asueto.");
                return; // Salir de la función sin generar más inputs
            }

            // Generar inputs dependiendo del valor de "diasAsueto"
            for (let i = 0; i < this.diasAsueto; i++) {
                this.diasAsuetoInputs.push({ fecha: "" });
            };
        },

        descargarPDF() {
            try {
                const { jsPDF } = window.jspdf;

                // Obtener datos de la tabla
                const data = [];
                const table = document.getElementById("attendance-table");
                const rows = table.querySelectorAll("tr");
                rows.forEach((row) => {
                    const rowData = [];
                    row.querySelectorAll("th, td").forEach((cell) => {
                        rowData.push(cell.textContent.trim());
                    });
                    data.push(rowData);
                });

                // Determinar si la tabla debe ser horizontal o vertical
                const orientation =
                    data[0].length > 10000 || data.length > 20000
                        ? "landscape"
                        : "portrait";
                const pdf = new jsPDF(orientation, "pt", "a4"); // Configurar orientación basada en los datos

                // Título del PDF
                const title = "Lista de asistencia";

                // Función para agregar el título en cada página
                const addTitle = (doc, text) => {
                    doc.setFontSize(18);
                    doc.setFont("helvetica", "bold");
                    doc.text(text, doc.internal.pageSize.getWidth() / 2, 30, {
                        align: "center",
                    });
                };

                // Llamar a la función addTitle en la primera página
                addTitle(pdf, title);

                // Dibujar la tabla en el PDF
                pdf.autoTable({
                    head: [data[0]],
                    body: data.slice(1),
                    startY: 60,
                    styles: {
                        fontSize: 5.4, // Tamaño de fuente para los datos de la tabla en el PDF
                        cellPadding: 5, // Relleno interno
                        valign: "middle",
                        halign: "center",
                        lineColor: [44, 62, 80],
                        lineWidth: 5,
                        overflow: "linebreak", // Evita que las palabras se corten
                    },
                    headStyles: {
                        fillColor: [44, 62, 80],
                        textColor: [255, 255, 255],
                        fontStyle: "bold",
                    },
                    bodyStyles: {
                        fillColor: [245, 245, 245],
                        textColor: [44, 62, 80],
                    },
                    alternateRowStyles: {
                        fillColor: [255, 255, 255],
                    },
                    columnStyles: {
                        1: { cellWidth: "auto" },
                        2: { cellWidth: "auto" },
                        3: { cellWidth: "auto" },
                    },
                    margin: { top: 50 },
                    didDrawPage: (data) => {
                        // Agregar el título en cada página
                        addTitle(pdf, title);
                    },
                });

                // Convertir el PDF a Blob
                const pdfBlob = pdf.output("blob");

                pdf.save("lista_asistencia.pdf");
            } catch (error) {
                console.error("Error al generar el PDF:", error);
            }
        },

        // Metodo para obtener el día del mes d euna fecha
        getDayFromDate(date) {
            return date ? new Date(date).getDate() : null;
        },
        mostrarTabla() {
            // Validaciones de los campos obligatorios
            /*if (!this.periodoInicio || !this.periodoFin || !this.cantidadAlumnos || !this.nombreGrupo || !this.nombreMateria || !this.nombreDocente) {
                alert("Por favor, complete todos los campos obligatorios.");
                return;
            }*/

            // Arreglos y variables de configuración
            const diasTimeStamp = []; // ? Arreglo las fechas de cada día de la lísta
            const diaSemestre = [];
            const diasVacaciones = [];
            const tbl = [];
            const diasFinales = []; // Areglo para los días fínales

            const alumnos = 10; // Cantidad de alumnos


            // Obtener fechas de inicio y fin del semestre
            // const startDateInput = new Date(this.periodoInicio);
            // const endDateInput = new Date(this.periodoFin);
            // const inicioP1 = new Date(this.inicioP1);
            // const finalP1 = new Date(this.finalP1);
            // const inicioP2 = new Date(this.inicioP2);
            // const finalP2 = new Date(this.finalP2);
            // const inicioP3 = new Date(this.inicioP3);
            // const finalP3 = new Date(this.finalP3);
            const startDateInput = '2024-10-04';
            const endDateInput = '2024-11-01';
            const inicioP1 = '2024-10-04';
            const finalP1 = '2024-10-14';
            const inicioP2 = '2024-10-15';
            const finalP2 = '2024-10-24';
            const inicioP3 = '2024-10-25';
            const finalP3 = '2024-11-01';

            /*if (!startDateInput || !endDateInput) {
                alert("Por favor, ingrese las fechas de inicio y fin.");
                return;
            }*/

            const startVacaciónes = this.inicioVacaciones;
            const endVacaciónes = this.finVacaciones
            const hayVacaciones = this.vacaciones;

            const primeraFecha = new Date('2024-10-15'); // Por ejemplo
            const segundaFecha = new Date('2024-11-15');
            const terceraFecha = new Date('2024-12-15');

            console.log(hayVacaciones);

            // TODO Agrega esto:
            const horasLunes = +this.horas['Lunes'] || 0;
            const horasMartes = +this.horas['Martes'] || 0;
            const horasMiercoles = +this.horas['Miércoles'] || 0;
            const horasJueves = +this.horas['Jueves'] || 0;
            const horasViernes = +this.horas['Viernes'] || 0;



            const diasAsueto = [...this.diasAsuetoInputs];

            console.log(diasAsueto);

            console.log(
                horasLunes,
                horasMartes,
                horasMiercoles,
                horasJueves,
                horasViernes
            );

            let fecha1 = new Date(startDateInput + "T00:00");
            const fecha2 = new Date(endDateInput + "T00:00");

            let vacaciones1 = new Date(startVacaciónes + "T00:00");
            const vacaciones2 = new Date(endVacaciónes + "T00:00");

            // Función para agregar días al semestre según las horas por día
            const agregarDiasAlSemestre = (dia, horas) => {
                for (let i = 0; i < horas; i++) {
                    diaSemestre.push(dia);
                }
            };

            // Función para crear la tabla con los días y alumnos
            const setearTabla = () => {
                tbl.push(["Alumnos", ...diaSemestre]);
                for (let i = 1; i <= alumnos; i++) {
                    const row = [`${i}`];
                    for (let j = 0; j < diaSemestre.length; j++) {
                        row.push({
                            data: "A",
                            color: "#806213" // * Color de las celdas
                        }); // Celdas vacías para llenar después
                    }
                    tbl.push(row);
                }

                // Asignar los días y alumnos al componente Vue
                this.dias = tbl[0];
                this.alumnos = tbl.slice(1);
            };

            if (fecha1 && fecha2) {
                if (fecha2 < fecha1) {
                    alert("La fecha de fin debe ser posterior a la de inicio.");
                    return;
                }
                // Generar los días del semestre
                while (fecha1 <= fecha2) {
                    let unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
                    diasTimeStamp.push(fecha1.getTime());
                    fecha1.setTime(fecha1.getTime() + unDiaEnMilisegundos);
                }
                
                /// TODO
                console.log(diasTimeStamp.length);

                if (hayVacaciones === "Si") {
                    while (vacaciones1 <= vacaciones2) {
                        let diasMilisegundos = 24 * 60 * 60 * 1000;
                        // Almacenar cada día de las vacaciones dentro del arreglo
                        diasVacaciones.push(vacaciones1.getTime());
                        vacaciones1.setTime(vacaciones1.getTime() + diasMilisegundos);
                    }
                }
                if (diasAsueto.length > 0) {
                    diasAsueto.forEach((dia) => {
                        diasVacaciones.push(new Date(dia.fecha + "T00:00").getTime());
                    });
                }
                console.log(diasVacaciones);

                // Ahora filtramos los días del semestre excluyendo los días que se encunetren dentro de las vaciónes
                diasFinales.push(
                    ...diasTimeStamp.filter((dia) => !diasVacaciones.includes(dia))
                );
                console.log(diasFinales);

                // ? Ahora utilzaremos el arreglo con los días que no se filtraron
                diasFinales.forEach((ts) => {
                    const fecha = new Date(ts);
                    const diaSemana = fecha.getDay(); // Obtiene el día de la semana
                
                    if (diaSemana !== 0 && diaSemana !== 6) {  // Excluir fines de semana
                        diaSemestre.push(fecha.getDate()); // Día normal
                
                        // Asignar horas por día según el día de la semana
                        switch (diaSemana) {
                            case 1:
                                agregarDiasAlSemestre(fecha.getDate(), horasLunes);
                                break;
                            case 2:
                                agregarDiasAlSemestre(fecha.getDate(), horasMartes);
                                break;
                            case 3:
                                agregarDiasAlSemestre(fecha.getDate(), horasMiercoles);
                                break;
                            case 4:
                                agregarDiasAlSemestre(fecha.getDate(), horasJueves);
                                break;
                            case 5:
                                agregarDiasAlSemestre(fecha.getDate(), horasViernes);
                                break;
                        }
                    }
                });



                // Actualizar la tabla
                setearTabla();

                // Ocultar el formulario
                this.showForm = false;
            } else {
                alert("Por favor ingrese las fechas.");
            }
        },
    },
});

// Creamos la función calcular el semestre:
function calcularSemestre() {
    // Creamos los espacios para las fechas
    const fecha1 = document.getElementById("startDate").value;
    const fecha2 = document.getElementById("endDate").value;
    const inHabilesInput = document.getElementById("inhabilDates").value;

    // Comprobamos que se hayan ingresado ambas fechas
    if (!fecha1 || !fecha2) {
        document.getElementById("semestreResult").innerText =
            "Ingresa ambas fechas";
        return; // Salimos de la función
    }

    // Convertimos las fechas en valores de tiempo
    const inicio = new Date(fecha1);
    const final = new Date(fecha2);

    // Nos aseguramos que la fecha de cierre sea posterior a la de inicio
    if (final <= inicio) {
        document.getElementById("semestreResult").innerText =
            "La fecha de cierre debe ser posterior a la fecha de inicio.";
        return; // Salimos de la función
    }

    // Almacenamos los datos inhabilitados:
    const inhabilDias = inHabilesInput
        .split(",")
        .map((date) => new Date(date.trim()));

    // Indicamos cuántos días hábiles tenemos
    let diasHabiles = 0;

    // Le pasamos la variable de inicio para recorrer cada día hasta la fecha final
    let actual = new Date(inicio);

    // Contamos cada día desde la fecha de inicio hasta la fecha final
    // Esto para excluir los fines de semana y posteriormente los días sin clase
    while (actual <= final) {
        const diaSemana = actual.getDay();

        // Verificamos si el día es inhabil o no:
        const esInhabil = inhabilDias.some(
            (inhabilDia) => actual.toDateString() === inhabilDia.toDateString()
        );

        // Solo contamos si no es fin de semana y no es un día inhabil
        if (diaSemana !== 0 && diaSemana !== 6 && !esInhabil) {
            diasHabiles++;
        }

        // Avanzamos al siguiente día:
        actual.setDate(actual.getDate() + 1);
    }

    // Mostramos el periodo:
    document.getElementById(
        "semestreResult"
    ).innerText = `La cantidad de días hábiles es: ${diasHabiles}`;
}

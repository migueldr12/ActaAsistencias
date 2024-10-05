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
      document.getElementById("semestreResult").innerText =
        "La fecha de cierre debe de ser posteriror";
    }

    // ? Almacenamos los datos inhabiles:
    const inhabilDias = inHabilesInput
      .split(",")
      .map((date) => new Date(date.trim()));
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
        (inhabilDias) => actual.toDateString() === inhabilDias.toDateString()
      );

      // Solo contamos si no es fin de semana
      if (diaSemana !== 0 && diaSemana !== 6) {
        diasHabiles++;
      }
      // Avanzamos al sigueente día:
      actual.setDate(actual.getDate() + 1);
    }

    // ? Mostramos el peridodo:
    document.getElementById(
      "semestreResult"
    ).innerText = `La cantidad de dáis es: ${diasHabiles}`;
  } else {
    document.getElementById("semestreResult").innerText = `Ingresa las fechas`;
  }
}

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            showForm: true,
            horasPorDia: '',
            periodoInicio: '',
            periodoFin: '',
            periodoEvaluaciones: '',
            vacaciones: '',
            inicioVacaciones: '',
            finVacaciones: '',
            diasAsueto: '',
            cantidadAlumnos: '',
            nombreGrupo: '',
            nombreMateria: '',
            nombreDocente: '',
            alumnos: [],
            vacacionesOptions: ['Sí', 'No'],
            horasPorDiaOptions: [0, 1, 2, 3, 4, 5],
        };
    },
    methods: {
        descargarPDF() {
            try {
                const { jsPDF } = window.jspdf;

                // Obtener datos de la tabla
                const data = [];
                const table = document.getElementById('attendance-table');
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const rowData = [];
                    row.querySelectorAll('th, td').forEach(cell => {
                        rowData.push(cell.textContent.trim());
                    });
                    data.push(rowData);
                });

                // Determinar si la tabla debe ser horizontal o vertical
                const orientation = data[0].length > 10000 || data.length > 20000 ? 'landscape' : 'portrait';
                const pdf = new jsPDF(orientation, 'pt', 'a4'); // Configurar orientación basada en los datos

                // Título del PDF
                const title = 'Lista de asistencia';

                // Función para agregar el título en cada página
                const addTitle = (doc, text) => {
                    doc.setFontSize(18);
                    doc.setFont('helvetica', 'bold');
                    doc.text(text, doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
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
                        cellPadding: 5,
                        valign: 'middle',
                        halign: 'center',
                        lineColor: [44, 62, 80],
                        lineWidth: 0.1,
                        overflow: 'linebreak' // Evita que las palabras se corten
                    },
                    headStyles: {
                        fillColor: [44, 62, 80],
                        textColor: [255, 255, 255],
                        fontStyle: 'bold'
                    },
                    bodyStyles: {
                        fillColor: [245, 245, 245],
                        textColor: [44, 62, 80]
                    },
                    alternateRowStyles: {
                        fillColor: [255, 255, 255]
                    },
                    columnStyles: {
                        1: { cellWidth: 'auto' },
                        2: { cellWidth: 'auto' }, 
                        3: { cellWidth: 'auto' } 
                    },
                    margin: { top: 50 },
                    didDrawPage: (data) => {
                        // Agregar el título en cada página
                        addTitle(pdf, title);
                    }
                });

                // Convertir el PDF a Blob
                const pdfBlob = pdf.output('blob');

                pdf.save('lista_asistencia.pdf');
            } catch (error) {
                console.error('Error al generar el PDF:', error);
            }
        }
    }
});
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

const fecha1 = new Date("2024-09-02");
const fecha2 = new Date("2024-09-24");

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
        generarAsistencia() {
            this.showForm = false;
            this.alumnos.push({
                horasPorDia: this.horasPorDia,
                periodoInicio: this.periodoInicio,
                periodoFin: this.periodoFin,
                periodoEvaluaciones: this.periodoEvaluaciones,
                vacaciones: this.vacaciones,
                inicioVacaciones: this.inicioVacaciones,
                finVacaciones: this.finVacaciones,
                diasAsueto: this.diasAsueto,
                cantidadAlumnos: this.cantidadAlumnos,
                nombreGrupo: this.nombreGrupo,
                nombreMateria: this.nombreMateria,
                nombreDocente: this.nombreDocente,
            });
            this.resetForm();
        },
        resetForm() {
            this.horasPorDia = '';
            this.periodoInicio = '';
            this.periodoFin = '';
            this.periodoEvaluaciones = '';
            this.vacaciones = '';
            this.inicioVacaciones = '';
            this.finVacaciones = '';
            this.diasAsueto = '';
            this.cantidadAlumnos = '';
            this.nombreGrupo = '';
            this.nombreMateria = '';
            this.nombreDocente = '';
        },
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


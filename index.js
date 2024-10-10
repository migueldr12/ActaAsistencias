"use strict";
new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
      showForm: true,
      horasPorDia: "",
      periodoInicio: "",
      periodoFin: "",
      periodoEvaluaciones: "",
      vacaciones: "",
      inicioVacaciones: "",
      finVacaciones: "",
      diasAsueto: "",
      cantidadAlumnos: "",
      nombreGrupo: "",
      nombreMateria: "",
      nombreDocente: "",
      alumnos: "",
      dias: "",
      diasAsueto: [],
      vacacionesOptions: ["Si", "No"],
      horasPorDiaOptions: [0, 1, 2, 3, 4, 5],
    };
  },
  methods: {
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
            cellPadding: 5,
            valign: "middle",
            halign: "center",
            lineColor: [44, 62, 80],
            lineWidth: 0.1,
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
    mostrarTabla() {
      // Arreglos y variables de configuración
      const diasTimeStamp = []; // ? Arreglo las fechas de cada día de la lísta
      const diaSemestre = [];
      const diasVacaciónes = [];
      const tbl = [];
      const diasFinales = []; // Areglo para los días fínales

      const alumnos = 24; // Cantidad de alumnos

      // Obtener fechas de inicio y fin del semestre
      const startDateInput = this.periodoInicio;
      const endDateInput = this.periodoFin;

      const startVacaciónes = this.inicioVacaciones;
      const endVacaciónes = this.finVacaciones;
      const hayVacaciones = this.vacacionesOptions;

      const horasLunes = 1;
      const horasMartes = 2;
      const horasMiercoles = 4;
      const horasJueves = 3;
      const horasViernes = 3;

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
          const row = [`Alumno ${i}`];
          for (let j = 0; j < diaSemestre.length; j++) {
            row.push(""); // Celdas vacías para llenar después
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
        while (fecha1 < fecha2) {
          let unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
          diasTimeStamp.push(fecha1.getTime());
          fecha1.setTime(fecha1.getTime() + unDiaEnMilisegundos);
        }
        /*
        TODO
        ? Si las vacipones se incluyen en la fecha del semestre No incluir esas fechas en el arreglo del semestre

        ? Días de asuelto que sea un arreglo igual a la cantidad de días que se necesiten
        ? Estos se almacenaran en un arreglo y se buscara excluir esos datos del arreglo del semestre
        */
        console.log(diasTimeStamp.length);

        if (hayVacaciones === "Si") {
          while (vacaciones1 < vacaciones2) {
            let diasMilisegundos = 24 * 60 * 60 * 1000;
            // Almacenar cada día de las vacaciones dentro del arreglo
            diasVacaciónes.push(vacaciones1.getTime());
            vacaciones1.setTime(vacaciones1.getTime() + diasMilisegundos);
          }

          // Ahora filtramos los días del semestre excluyendo los días que se encunetren dentro de las vaciónes
          diasFinales = diasTimeStamp.filter(
            (dia) => !diasVacaciónes.includes(dia)
          );
        } else {
          diasFinales.push(...diasTimeStamp);
        }

        console.log(diasFinales);

        //  La cantidad del arregllo se deifne deacuerdo a la cantidad indicada por el usuario
        // Y estos datos los lee por medio de un bucle for
        //  En lugar del ".values" se utiliza "this.(ide del elemento del vue.js)

        // Asignar los días hábiles al semestre
        // diasTimeStamp.forEach((ts) => {
        // ? Ahora utilzaremos el arreglo con los días que no se filtraron
        diasFinales.forEach((ts) => {
          const dia = new Date(ts).getDay();
          const numDia = new Date(ts).getDate();
          if (dia !== 0 && dia !== 6) {
            // Excluir fines de semana
            switch (dia) {
              case 1:
                agregarDiasAlSemestre(numDia, horasLunes);
                break;
              case 2:
                agregarDiasAlSemestre(numDia, horasMartes);
                break;
              case 3:
                agregarDiasAlSemestre(numDia, horasMiercoles);
                break;
              case 4:
                agregarDiasAlSemestre(numDia, horasJueves);
                break;
              case 5:
                agregarDiasAlSemestre(numDia, horasViernes);
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

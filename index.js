// Creamos la función calcular el semestre:
function calcularSemestre() {
  // Creamos los espacios para las fechas
  const startDateInput = document.getElementById("startDate").value; // Extraemos los valores del input
  const endDateInput = document.getElementById("endDate").value;
  // const horasLunes = Number(document.getElementById("horasLunes").value);
  // const horasMartes = Number(document.getElementById("horasMartes").value);
  // const horasMiercoles = Number(
  //   document.getElementById("horasMiercoles").value
  // );
  // const horasJueves = Number(document.getElementById("horasJueves").value);
  // const horasViernes = Number(document.getElementById("horasViernes").value);
  const horasLunes = 1;
  const horasMartes = 2;
  const horasMiercoles = 4;
  const horasJueves = 3;
  const horasViernes = 3;

  let fecha1 = new Date(startDateInput + "T00:00"); // Aseguramos que sera la hora local y tomara las de UTC
  const fecha2 = new Date(endDateInput + "T00:00");
  //Arreglo que tendra todos los timesatmps de todos los dias de la fecha 1 a la 2
  const diasTimeStamp = [];
  // Arrglo que contendra todos los dias del semestre
  const diaSemestre = [];
  const tbl = [];
  const alumnos = 24;
  // const inHabilesInput = document.getElementById("inhabilDates").value;

  const agregarDiasAlSemestre = function (dia, horas) {
    for (let i = 0; i < horas; i++) {
      diaSemestre.push(dia);
    }
  };

  const setearTabla = function (alumnos) {
    tbl.push([["Alumnos", ...diaSemestre]]);
    let row = [];
    for (let i = 0; i <= alumnos; i++) {
      row.push(`ALumno ${i}`);
      for (let j = 0; j < diaSemestre.length; j++) {
        row.push("");
      }
      tbl.push(row);
      row = [];
    }
  };
  // const semestre = new Date(fecha2 - fecha1);
  // console.log(semestre);

  //
  if (fecha1 && fecha2) {
    //! Nos aseguramos que no son el mismo día:
    if (fecha2 < fecha1) {
      // document.getElementById("semestreResult").innerText =
      //   "La fecha de cierre debe de ser posteriror"; // Pendiente, agregar una sweetAlert
      alert("fechas incorrectas");
    }

    while (fecha1 < fecha2) {
      console.log(fecha1);

      // Establecemos los milisegundos de un dia completo para luego agregarlo al timestamp
      let unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
      //Agregamos el timestamp de la primera fecha
      diasTimeStamp.push(fecha1.getTime());
      // Seteamos el timestamp de la fecha1 un dia mas
      fecha1.setTime(fecha1.getTime() + unDiaEnMilisegundos);
    }

    diasTimeStamp.forEach((ts) => {
      const dia = new Date(ts).getDay();
      if (dia !== 0 && dia !== 6) {
        switch (dia) {
          case 1:
            agregarDiasAlSemestre(dia, horasLunes);
            break;
          case 2:
            agregarDiasAlSemestre(dia, horasMartes);
            break;
          case 3:
            agregarDiasAlSemestre(dia, horasMiercoles);
            break;
          case 4:
            agregarDiasAlSemestre(dia, horasJueves);
            break;
          case 5:
            agregarDiasAlSemestre(dia, horasViernes);
            break;
        }
      }
    });

    console.log(diaSemestre);

    setearTabla(alumnos);

    console.log(tbl);
    // // ? Almacenamos los datos inhabiles:
    // const inhabilDias = inHabilesInput
    //   .split(",")
    //   .map((date) => new Date(date.trim()));
    // // ? indicamos cuantos dias habiles tenemos
    // let diasHabiles = 0;
    // // ? Le pasamos la variable de inicio para recorrer cada día hasta la fecha de final
    // let actual = new Date(inicio);

    // // ? Contamos cada día desde la fecha de inicio hasta la fecha final
    // // ? Esto para excluir los fines de semana y posterirormente los días sin clase
    // while (actual <= final) {
    //   //
    //   const diaSemana = actual.getDay();

    //   // Verificamos si el día es habil o no:
    //   const noEsHabil = inhabilDias.some(
    //     (inhabilDias) => actual.toDateString() === inhabilDias.toDateString()
    //   );

    //   // Solo contamos si no es fin de semana
    //   if (diaSemana !== 0 && diaSemana !== 6) {
    //     diasHabiles++;
    //   }
    //   // Avanzamos al sigueente día:
    //   actual.setDate(actual.getDate() + 1);
    // }

    // ? Mostramos el peridodo:
    // document.getElementById(
    //   "semestreResult"
    // ).innerText = `La cantidad de dáis es: ${diasHabiles}`;
  } else {
    // document.getElementById("semestreResult").innerText = `Ingresa las fechas`;
    alert("ingrese las fechas");
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

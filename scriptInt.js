/*
    Tener en cuenta que 
    Efectividad = (Energia generada total) / (presupuesto x tiempo total)

    Nota: para obtener length de array de objetos [{}], usar Object.keys(tablaEfectividad).length 
*/

// Importo scriptCalculos.js. TODO Implementar
// Fuente: https://stackoverflow.com/a/4636492
// document.writeln("<script type='text/javascript' src='scriptCalculos.js'></script>");

// Definición variables globales

// Valores energías en tabla de consigna como referencia
// Verificar si debe cambiarse
var tablaEnergia = 
[
    {tipo:"Eolica", descripcion:"Molino a 2km", energiaGenerada:1500, presupuesto:500000, tiempoEstimado:2},
    {tipo:"Eolica", descripcion:"Molino arriba de la planta", energiaGenerada:1300, presupuesto:650000, tiempoEstimado:1},
    {tipo:"Hidroelectrica", descripcion:"Presa A-120", energiaGenerada:2000, presupuesto:1300000, tiempoEstimado:7},
    {tipo:"Hidroelectrica", descripcion:"Presa XA-342", energiaGenerada:4500, presupuesto:1700000, tiempoEstimado:24},
    {tipo:"Solar", descripcion:"4 paneles A-54", energiaGenerada:1200, presupuesto:350000, tiempoEstimado:0.25},
    {tipo:"Solar", descripcion:"2 paneles A-571011", energiaGenerada:1700, presupuesto:700000, tiempoEstimado:1}
]

var tablaTipos =
[
    {tipo:"Eolica"}, {tipo:"Hidroelectrica"}, {tipo:"Solar"}
]

// tablaEnergia real de inputs
var tablaEnergiaInput = [];

// referencia para mostrar valor de array de objetos
// console.log(tablaEnergia[0].tipo);

var energiaGenTotal = "";  
var presupuestoTotal = "";
var tiempoTotal = "";

var efectividad = 0; 
var efectSort = {};

// usado como iterador para indice de último row
var numRow = 0;

// tablaEfectividad con valores de referencia
var tablaEfectividad = getEfectividadDefault(tablaEnergia);

//inicializarTabla();

function showListaTipos(tabla)
{
    /*
    Fuente
    https://stackoverflow.com/questions/11239298/setting-values-for-a-drop-down-list-in-javascript
    */    
    
    //pasaje a array para solo tipos de energia, en crudo...
    // Seguro hay una forma mas directa de hacerlo pero no encontre nada
    var tiposEnergia = [];
    for (var i = 0 ; i < tabla.length ; i++)
    {
        tiposEnergia[i] = tabla[i].tipo;
    }

    var tiposEnergiaFiltrado = eliminarDuplicados(tiposEnergia);

    for (i = 0 ; i < tiposEnergiaFiltrado.length ; i++)
    {
        var drp = document.getElementById("listaTipos");
        var optn = document.createElement("OPTION");
        optn.text = tiposEnergiaFiltrado[i]; 
        optn.value = tiposEnergiaFiltrado[i];  
        drp.add(optn);
    }
}

//show tabla de tipo de energia
function inicializarTabla()
{
    document.getElementById('tabla').innerHTML = "<table id='tablaDatos'> <th>Tipo de Energía</th> <th>Descripcion</th> <th>Energía generada (en kw/h)</th> <th>Presupuesto</th> <th>Tiempo estimada (en meses)</th> ";
}

//añadir row de datos
function addImplementacion(tablaEnergiaInput)
{
    //get Values de form
    var inputTipo = document.getElementById('listaTipos').value;
    var inputDesc = document.getElementById('descripcion').value;
    var inputEnergiaGen = document.getElementById('energiaGenerada').value;
    var inputPresupuesto = document.getElementById('presupuesto').value;
    var inputTiempo = document.getElementById('tiempoEstimado').value;

    let flagAdd = comprobarInputs(inputTipo, inputDesc, inputEnergiaGen, 
        inputPresupuesto, inputTiempo);

    if(flagAdd)
    {
        //asignacion datos. fixear
        tablaEnergiaInput[numRow] = 
        {
            tipo:inputTipo, 
            descripcion:inputDesc, 
            energiaGenerada:inputEnergiaGen, 
            presupuesto:inputPresupuesto, 
            tiempoEstimado:inputTiempo
        }
        /* tablaEnergiaInput[numRow].tipo = inputTipo;
        tablaEnergiaInput[numRow].descripcion = inputDesc;
        tablaEnergiaInput[numRow].energiaGenerada = inputEnergiaGen;
        tablaEnergiaInput[numRow].presupuesto = inputPresupuesto;
        tablaEnergiaInput[numRow].tiempoEstimado = inputTiempo; */

        addRow(inputTipo, inputDesc, inputEnergiaGen, inputPresupuesto, inputTiempo);
        numRow+=1;
        alert("Los datos han sido cargados con éxito.");
    }
    else
    {
        alert("No se han cargado datos.");
    }

}

function comprobarInputs(inputTipo, inputDesc, inputEnergiaGen, inputPresupuesto, inputTiempo)
{
    
    if(inputTipo == document.getElementById('defaultSelect').value)
    {
        alert("Seleccione algún Tipo de Energía.");
        return false;
    }  

    if(inputDesc == "")
    {
        alert ("Inserte una Descripción válida.");
        return false;
    }

    if(isNaN(inputEnergiaGen) || inputEnergiaGen <= 0)
    {
        alert ("Inserte un número válido de Energía generada.");
        return false;
    }

    if(isNaN(inputPresupuesto) || inputPresupuesto <= 0)
    {
        alert ("Inserte un número válido de Presupuesto.");
        return false;
    }
    
    if(isNaN(inputTiempo) || inputTiempo <= 0)
    {
        alert ("Inserte un número válido de Tiempo Estimado.");
        return false;
    }

    return true;

}

// Añadir valores a tabla
function addRow(inputTipo, inputDesc, inputEnergiaGen, inputPresupuesto, inputTiempo)
{
    //innerHTML hace un soft-restart de la página, reinicializando variables en el proceso.
    //Usar appendChild.

    var table = document.getElementById("tablaDatos");
    var row = document.createElement("tr");

    // Usado para cada columna
    var tdTipo = document.createElement("td");
    tdTipo.innerText = inputTipo;
    row.appendChild(tdTipo);

    var tdDesc = document.createElement("td");
    tdDesc.innerText = inputDesc;
    row.appendChild(tdDesc);

    var tdEnerGen = document.createElement("td");
    tdEnerGen.innerText = inputEnergiaGen;
    row.appendChild(tdEnerGen);

    var tdPres = document.createElement("td");
    tdPres.innerText = inputPresupuesto;
    row.appendChild(tdPres);

    var tdTiempo = document.createElement("td");
    tdTiempo.innerText = inputTiempo;
    row.appendChild(tdTiempo);

    //end of the row
    table.appendChild(row);

}

function procesarResultados()
{
    //usar tablaEnergiaInput

    txtSinEntradas = "No se han podido realizar cálculos. La tabla está vacía.";

    var divSumatoria = document.getElementById("sumatoria");

    // Verificacion si tabla está vacía
    if(tablaEnergiaInput.length <= 0)
    {
        /*  var txtSinEntradas = document.createElement("p");
        txtSinEntradas.innerText = txt;

        divSumatoria.appendChild(txtSinEntradas); */
        // errorLogger || resultLogger
        document.getElementById("errorLogger").innerText = txtSinEntradas;
        document.getElementById("resultLogger").innerText = "";
    }
    else
    {
        //Creo tabla temporal de promedio de valores por tipo
        
        let tipo = "Eolica";
        var eolica = sumValores(tipo);
        efectEolica = calcEfectividad(eolica);
        console.log(eolica, tipo);
        addResultLogger(tipo, efectEolica);
    }
}

function addResultLogger(tipo, efectividad)
{
    textLog = "La efectividad calculada del tipo "+ tipo +" es: "+ efectividad +".";

    var divSumatoria = document.getElementById("sumatoria");
    var newLog = document.createElement("p");
    newLog.innerText = textLog;
    divSumatoria.appendChild(newLog);
}

// comparar efectividad con tabla dada de energias de referencia (original)
function compareEfectividadPrompt(tablaEfectividad, efectividad)
{

    //ordenamiento menor a mayor de tabla
    //La que mas me convence, al menos:
    
    efectSort = tablaEfectividad.sort(function(a, b) 
    { 
        return a.efectividad- b.efectividad;
    });
    
    
    //verificar output
    console.log("Efectividad más baja: Tipo - " + efectSort[0].tipo + ", "+ efectSort[0].efectividad);
    console.log("Efectividad más alta: Tipo - " + efectSort[efectSort.length -1].tipo + ", "+ efectSort[efectSort.length -1].efectividad);

    var i = efectSort.length -1;

    if(efectividad > efectSort[efectSort.length -1].efectividad)
    {
        alert("No se ha encontrado un tipo de energía recomendada en base a los valores ingresados.");
    }
    else
    {
        while(i >= 0)
        {
            if(efectividad < efectSort[i].efectividad)
            {
                i -= 1;
                console.log("Recorriendo índice " + i);
            }
            else if(efectividad >= efectSort[i].efectividad)
            {
                console.log("Efectividad obtenida: "+efectividad);

                console.log("Indice "+i+". Tipo -1: "+ efectSort[i].tipo +" - Efectividad -1: "+efectSort[i].efectividad);
                console.log("Indice "+ (i+1) +". Tipo +1: "+ efectSort[i+1].tipo +" - Efectividad +1: "+efectSort[i+1].efectividad);

                alert("La energía recomendada en base a los valores ingresados es de tipo " + efectSort[i+1].tipo);
                break;
            }
        }
    }

}

//calcEfectividad Original con prompts...
function calcEfectividadPrompt()
{

    //Captura de energia total
    do
    {
        var energiaGenTotal = prompt("Inserte energía generada total en kw/h");
        if(isNaN(energiaGenTotal))
            alert("Por favor inserte un valor numérico.");
        
    } while ((energiaGenTotal == "") || isNaN(energiaGenTotal));

    //checkNull();

    //Captura de presupuesto total
    do
    {
        var presupuestoTotal = prompt("Inserte presupuesto total SIN separadores");
        if(isNaN(presupuestoTotal))
            alert("Por favor inserte un valor únicamente numérico.");
        
    } while (isNaN(presupuestoTotal) || (presupuestoTotal == ""));

    //checkNull();

    //Captura de tiempo total
    do
    {
        var tiempoTotal = prompt("Inserte tiempo total en cantidad de meses");
        if(isNaN(tiempoTotal))
            alert("Por favor inserte un valor numérico.");
        
    } while (isNaN(tiempoTotal) || (tiempoTotal == ""));

    //checkNull();

    var efectividad = (energiaGenTotal) / (presupuestoTotal * tiempoTotal);

    if(isNaN(efectividad) || !isFinite(efectividad) || efectividad == "NaN")
    {
        alert("No se pudo calcular la efectividad energética.");
    }
    else
    {
        alert("La efectividad calculada es: " + efectividad);
        compareEfectividadPrompt(tablaEfectividad, efectividad);
    }
       

    /* 
    document.write("<p>La efectividad calculada es: " + efectividad + "</p>");
    document.write("<br><p>Los datos ingresados son: </p>");
    document.write("<br><p>Energia generada: "+ energiaGenTotal + "</p>");
    document.write("<br><p>Presupuesto: "+ presupuestoTotal + "</p>");
    document.write("<br><p>Tiempo: "+ tiempoTotal + "</p>"); */
}

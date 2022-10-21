//Script usado para funciones de cálculos

function getEfectividadDefault(tablaEnergia)
{
    let tablaEfectividad = [{}]
    var efectividades = 0.0

    console.log("Cargando tabla de efectividades...");
    //asignacion de valores a tablaEfectividad
    for (i = 0 ; i < tablaEnergia.length ; i++)
    {
        efectividades = (tablaEnergia[i].energiaGenerada) / (tablaEnergia[i].presupuesto * tablaEnergia[i].tiempoEstimado);
        tablaEfectividad[i] = {tipo:tablaEnergia[i].tipo, efectividad:efectividades};
        console.log("Tipo: " + tablaEfectividad[i].tipo + " / Ef: " + tablaEfectividad[i].efectividad);
    }
    return tablaEfectividad;
}


function eliminarDuplicados(array) {
    return array.filter((value, index) => array.indexOf(value) === index);
}


// Sumar valores de campos por Tipo, para luego dividirlos
function sumValores(valor)
{

    console.log("Calculando sumatoria de entradas de tipo " + valor);

    tablaTipo = [{
        "energiaGenerada": 0,
        "presupuesto": 0,
        "tiempoEstimado": 0,
        "coincidencias": 0 //Se aplica uso de contador
    }];

    //contador de coincidencias
    var count = 0;

    for (let i = 0; i < tablaEnergiaInput.length; i++) 
    {
        if (tablaEnergiaInput[i].tipo == valor)
        {
            count++;
            //parsear a int, lo toma como string
            tablaTipo[0].energiaGenerada = ( parseInt(tablaTipo[0].energiaGenerada) + parseInt(tablaEnergiaInput[i].energiaGenerada) );
            tablaTipo[0].presupuesto = ( parseInt(tablaTipo[0].presupuesto) + parseInt(tablaEnergiaInput[i].presupuesto) );
            tablaTipo[0].tiempoEstimado = ( parseInt(tablaTipo[0].tiempoEstimado) + parseInt(tablaEnergiaInput[i].tiempoEstimado) );
        }
    }

    tablaTipo[0].coincidencias = count;

    return tablaTipo;
}

function countByTipo(valor)
{
    let count = 0;

    for (let i = 0; i < tablaEnergiaInput.length; i++) {
        if (tablaEnergiaInput[i].tipo == valor)
        count++;
    }

    return count;
}


// Calcular efectividad energética
//adaptado para atrapar valores de tabla por energiaGen, presupuesto, tiempo
function calcEfectividad(tablaTipo, tipo)
{
    var efectividad = (tablaTipo[0].energiaGenerada) / (tablaTipo[0].presupuesto * tablaTipo[0].tiempoEstimado);
    
    console.log(efectividad);

    if(isNaN(efectividad) || !isFinite(efectividad) || efectividad == "NaN")
    {
        alert("No se pudo calcular la efectividad energética.");
    }
    else
    {        
        //alert("La efectividad calculada del tipo "+ tipo +" es: " + (efectividad / tablaTipo[0].coincidencias));
        compareEfectividad(tablaEfectividad, efectividad);
        return (efectividad / tablaTipo[0].coincidencias);
    }

}


// comparar efectividad con tabla dada de energias
// TODO revisar para incluir logger
function compareEfectividad(tablaEfectividad, efectividad)
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
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Integrador</title>
    
    <link rel="stylesheet" href="styleNuevo.css">
    
    <script src="scriptCalculos.js"></script>
    <script src="scriptInt.js"></script>
   

</head>

<body class="center" >
    
    <!-- TODO: hacer formulario con ingreso de datos
    Tipo de energia: lista desplegable          ok - js? 
    Descripcion, text input                     ok - js?
    energia generada: input num                 ok - js?
    presupuesto: input num                      ok - js?
    Tiempo estimado meses: input num
    
    btn agregar implementacion: llamar a archivo php que agregue row a tabla
    btn procesar resultados: sacar promedio de efectividades ingresadas a la row por tipo de energia
    
     -->
    <h3>Bienvenido/a</h3>

        <div class="form left">
            <form>
                <label for="listaTipos">Tipo de Energía</label>
                <br class = "form">
                <select name="listaTipos" id="listaTipos" class = "btnInput"> 
                    <option id = "defaultSelect" value="nada" selected disabled>Seleccione tipo de Energía</option>
                    <script type = "text/javascript">showListaTipos(tablaTipos);</script>
                </select>

                <br class = "postItem">

                <label for="descripcion">Descripción</label>
                <br class = "form">
                <input type="text" id = "descripcion" placeholder = "Ingrese una descripción">

                <br class = "postItem">
                <label for="energiaGenerada">Energía Generada</label>
                <br class = "form">
                <input type="number" id = "energiaGenerada" placeholder = "Ingrese valor de energía generada">
                <p class = "detail">
                    *Indicar sin separadores de miles <br>
                    *Usar unidades de kw/h
                </p>

                <br class = "postItem">
                <label for="presupuesto">Presupuesto ($)</label>
                <br class = "form">
                <input type="number" id = "presupuesto" placeholder = "Ingrese valor de presupuesto">
                <p class = "detail">*Indicar sin separadores de miles</p>

                <br class = "postItem">
                <label for="tiempoEstimado">Tiempo Estimado</label>
                <br class = "form">
                <input type="number" id = "tiempoEstimado" placeholder = "Ingrese valor de presupuesto">
                <p class = "detail">*En cantidad de meses</p>

            </form>

            <p>Seleccione una de las siguientes opciones</p>
            <br>
            <a onClick="addImplementacion(tablaEnergiaInput)" class="btnComun">Agregar implementación</a>
            <br class ="postBtn">
            <a onClick="procesarResultados()" class="btnComun">Procesar resultados</a>
            <br class ="postBtn">
            <!-- <a onClick="calcEfectividadPrompt()" class="btnComun">Calcular Efectividad</a> -->
        </div>

        <div id = "logDatos" class="split right">
            <div id = "tabla">
                <script type = "text/javascript">inicializarTabla();</script>
            </div>
            <br>

            <div id = "sumatoria">
                <p id = "errorLogger"></p>
                <p id = "resultLogger"></p>
            </div>

        </div>
       
</body>

</html>
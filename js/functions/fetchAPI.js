/*  Syntax:
 *   oName = OBJECTS
 *   aName = ARRAY
 *   functionName = FUNCTION
 *   variable_name = VARIABLE
 *   CONST_NAME = CONST
 */
/**|-->|><|<--||-->|><|<--||-->|><|<--||-->|><|<--||-->|><|<--||-->|><|<--|**/
/* Vamos a usar el método fetch
 *  para consumir la API PUBLICA
 *   del sistema de precios del dólar.
 */

const API_URL = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

window.onload = actualizarCotizaciones();
/*Con esta funcion que es inicializada al comienzo del codigo, cuando la pagina
se encuente cargada vendra a buscar el actualizador de cotizaciones y cargaré el HTML 
con los datos*/


function actualizarCotizaciones() {
  var info = document.getElementById("table-info");
  info.innerHTML = "";  /*Con esto lo que evitamos es que se agregue constantemente codigo HTML */
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      for (var i in data) {
        if ( /*Con este IF estamos filtrando los datos que nos entrega en crudo la API*/
          data[i].casa.nombre.includes("Dolar") &&
          !data[i].casa.compra.includes("No Cotiza")
        ) {
          info.innerHTML += ` 
            <tr>
            <th scope="row">${data[i].casa.agencia}</th>
            <td>${data[i].casa.nombre}</td>
            <td>${data[i].casa.compra}</td>
            <td>${data[i].casa.venta}</td>
            </tr>
             `;
        }
      }
    });
}


/*Con la siguiente funcion descargamos el archivo Json completo tal y como nos lo entrega la API */
function descargarCotizaciones() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      var json = JSON.stringify(data);
      var blob = new Blob([json], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "cotizaciones.json";
      document.body.appendChild(a);
      a.click();
    });
}

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
var aDolar = []
const API_URL = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
function read()
{
	fetch(API_URL)
		.then(response => response.json())
		.then(data => 
            {
                aDolar = aDolar.splice(0, 1, aDolar.push(data))
                console.log(aDolar)
            })
}
read()
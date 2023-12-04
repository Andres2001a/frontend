
const url = 'https://node-index-js-catf.onrender.com/productos'

const listarProductos = async () => {
    //Objeto del html donde se deslegará la información
    let objectId = document.getElementById('contenido')
    let contenido = ''//Contiene filas y celdas que se desplegarán en el tbody

    //Fecth permite reaizar peticiones http a una url
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(function (data) {//Se manipulan los datos obtenidos de la url
            let listaProductos = data.msg //msg es el nombre de la lista retorna con json
            console.log(listaProductos)
            listaProductos.map(function (producto) {
                //Configurar el objeto para enviarlo por url
                objetoProducto = Object.keys(producto).map(key => key + '=' +
                    encodeURIComponent(producto[key])).join('&');
                console.log(producto)
                contenido = contenido + `<tr>` +
                    `<td>` + producto.id_producto + `</td>` +
                    `<td>` + producto.nombre_producto + `</td>` +
                    `<td>` + producto.talla + `</td>` +
                    `<td>` + producto.descripcion_producto + `</td>` +
                    `<td><button onclick="redireccionarEditar('${objetoProducto}')"
            style= "border: 1px solid grey; background: none;">
            EDITAR
            </td>`+
                    `<td>
        <button onclick="eliminarProducto('${producto.id_producto}')"
                style="border: 1px solid grey; background: none;">
                ELIMINAR
        </button>
    </td>`+
                    `</tr>`
            })
            objectId.innerHTML = contenido
        })

}

const registrarProducto = () => {
    const id = document.getElementById('idproducto').value;
    const nombre = document.getElementById('nombre').value
    const talla = document.getElementById('talla').value
    const desc = document.getElementById('desc').value
   


    if (id.length == 0) {
        document.getElementById('idproductoHelp').innerHTML = 'Dato requerido'

    }
    else if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if (desc == 0) {
        document.getElementById('descHelp').innerHTML = 'Dato requerido'
    }else if (talla == 0) {
        document.getElementById('tallaHelp').innerHTML = 'Dato requerido'
    }  else {
        let producto = {
            id_producto: id,
            nombre_producto: nombre,
            talla: talla,
            descripcion_producto: desc
        }

        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(producto),//Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                alert(json.msg) //Imprimir el mensaje de la transacción
            })
            alert('PRODUCTO GUARDADO')
            document.location.href = "listaProductos.html"
    }
}

const actualizarProducto = () => {
    const id = document.getElementById('idproducto').value
    const nombre = document.getElementById('nombre').value
    const talla = document.getElementById('talla').value
    const desc = document.getElementById('desc').value
   


    if (id.length == 0) {
        document.getElementById('idproductoHelp').innerHTML = 'Dato requerido'

    }
    else if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if (desc == 0) {
        document.getElementById('descHelp').innerHTML = 'Dato requerido'
    }else if (talla == 0) {
        document.getElementById('tallaHelp').innerHTML = 'Dato requerido'
    }else {
        let producto = {
            id_producto: id,
            nombre_producto: nombre,
            talla: talla,
            descripcion_producto: desc
        }

        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(producto),//Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                alert(json.msg) //Imprimir el mensaje de la transacción
            })
            alert('PRODUCTO ACTUALIZADO')
            document.location.href = "listaProductos.html"
    }
}

const redireccionarEditar = (objetoVehiculo) => {
    document.location.href = 'editarProducto.html?categoria=' + objetoVehiculo
}

const editarProducto = () => {
    // Obtener datos de la url
    var urlParams = new URLSearchParams(window.location.search);
    //Asignar valores a cajas de texto
    document.getElementById('idproducto').value = urlParams.get('id_producto')
    document.getElementById('nombre').value = urlParams.get('nombre_producto')
    document.getElementById('talla').value = urlParams.get('talla')
    document.getElementById('desc').value = urlParams.get('descripcion_producto')


}

const eliminarProducto = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        fetch(`${url}?id_producto=${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error de red - Código de estado ${res.status}`);
            }
            return res.json();
        })
        .then(json => {
            alert(json.msg);
            // Volver a cargar la lista después de eliminar
            listarProductos();
        })
        .catch(error => console.error('Error al eliminar la categoría:', error.message));
    }
}





if (document.querySelector('#btnRegistrar')) { //Si objeto exitste
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarProducto)
}

if (document.querySelector('#btnActualizar')) {//Si objeto existe
    document.querySelector('#btnActualizar')
        .addEventListener('click', actualizarProducto)
}

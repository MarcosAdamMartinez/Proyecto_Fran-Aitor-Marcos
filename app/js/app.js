function inicializar() {
    const telefono = document.getElementById('telefono');
    telefono.value = '+34 ';

    const formulario = document.querySelector('form');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); 

        validarUsuario();
        validarEmail();
        validarTelefono();
        validarCheckBoxes();

        const hayErrores = document.querySelectorAll('.campo-error').length > 0;

        // uso navigator.onLine
        if (!navigator.onLine) {
            alert("No se ha podido enviar el formulario sin conexión a Internet.");
            return;
        }

        if (hayErrores) {
            let campos = '';

            document.querySelectorAll('.campo-error').forEach(function(campo) {
                campoActual = '- '+campo.id[0].toUpperCase() + campo.id.slice(1);
                campos += campoActual + '\n    ';
            });

            alert("Por favor, corrige los errores antes de enviar:\n     "+campos);
        } else{
            alert("Formulario enviado con éxito.");
        }
    });

    // Comprobar la conexión a Internet
    const container = document.querySelector('.container');

    function actualizarEstadoConexion() {
        // FORZAMOS toggle según estado
        container.classList.toggle('sin-conexion', !navigator.onLine);
    }

    // Comprobación inicial
    actualizarEstadoConexion();

    window.addEventListener('online', actualizarEstadoConexion);
    window.addEventListener('offline', actualizarEstadoConexion);

}

document.addEventListener('DOMContentLoaded', inicializar);

function pintar(campo, texto, estaBien, mensajeError) {
    if (estaBien) {
        campo.classList.remove('campo-error');
        campo.classList.add('campo-ok');
        
        texto.textContent = 'Correcto';
        texto.className = 'msg-ok'; 
    } else {
        campo.classList.remove('campo-ok');
        campo.classList.add('campo-error');
        
        texto.textContent = mensajeError;
        texto.className = 'msg-error'; 
    }
}


function validarUsuario() {
    const nombre = document.getElementById('nombre');
    const texto = document.querySelector('#texto1');

    if (nombre.value.length < 3) {
        pintar(nombre, texto, false, 'No se permiten nombres de usuario con menos de 3 caracteres');
    } else {
        console.log('Nombre de usuario válido');
        pintar(nombre, texto, true, '');
    }
}

function validarEmail() {
    const email = document.getElementById('email');
    const texto = document.querySelector('#texto2');

    if (email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
        pintar(email, texto, false, 'Formato de correo electrónico no válido');
    } else {
        console.log('Correo electrónico válido');
        pintar(email, texto, true, '');
    }
}

function validarTelefono() {
    const telefono = document.getElementById('telefono');
    const texto = document.querySelector('#texto3');

    if (telefono.value.startsWith('+34 ')) {
        if(isNaN(telefono.value.split(' ')[1])) {
            pintar(telefono, texto, false, 'El número de teléfono solo debe contener dígitos');
        } else if (telefono.value.split(' ')[1].length < 9) { 
            pintar(telefono, texto, false, 'El número de teléfono debe tener al menos 9 dígitos');
        } else if (telefono.value.split(' ')[1].length > 9) {
            pintar(telefono, texto, false, 'El número de teléfono no puede tener más de 9 dígitos');
        } else {
            console.log('Teléfono válido: ' + telefono.value.split(' ')[1]);
            pintar(telefono, texto, true, '');
        }
    } else {
        if (isNaN(telefono.value)) {
            pintar(telefono, texto, false, 'El número de teléfono solo debe contener dígitos');
        } else if (telefono.value.length < 9) { 
            pintar(telefono, texto, false, 'El número de teléfono debe tener al menos 9 dígitos');
        } else if (telefono.value.length > 9) {
            pintar(telefono, texto, false, 'El número de teléfono no puede tener más de 9 dígitos');
        } else {
            console.log('Teléfono válido: ' + telefono.value);
            pintar(telefono, texto, true, '');
        }
    }
}

function validarSelect() {
    const select = document.getElementById('comunidad');
    const texto = document.querySelector('#texto4');
    
    if (select.value === '') {
        pintar(select, texto, false, 'Debe seleccionar una opción');
    } else {
        pintar(select, texto, true, '');
    }

}



function validarCheckBoxes() {
    const checkboxes = document.querySelectorAll('input[name="temas"]'); 
    
    const texto = document.querySelector('#texto5');
    
    const grupo = document.querySelector('.checkbox-group'); 
    
    let algunoSeleccionado = false;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            algunoSeleccionado = true;
            // Uso dataset
            console.log("Tema seleccionado: " + checkbox.value + "| Categoria: " + checkbox.dataset.categoria);
        }
    });

    if (!algunoSeleccionado) {
        pintar(grupo, texto, false, 'Debe seleccionar al menos una opción');
    } else {
        pintar(grupo, texto, true, '');
    }
}

function agregarTemaNuevo() {
    const inputTexto = document.getElementById('nuevo-tema-texto');
    const contenedor = document.getElementById('nuevos-temas-container');
    const valor = inputTexto.value;

    if (valor === "") {
        alert("Por favor, escribe un nombre para el tema.");
        return;
    }

    const div = document.createElement('div');
    div.className = 'checkbox-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'temas';
    checkbox.value = valor;
    checkbox.id = 'tema_' + Date.now();
    checkbox.checked = true;

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = valor;
    label.style.margin = '0';
    label.style.fontWeight = 'normal';

    div.appendChild(checkbox);
    div.appendChild(label);

    contenedor.appendChild(div);

    inputTexto.value = '';

    validarCheckBoxes();
}

function eliminarTemasSeleccionados() {
    const checkboxesMarcados = document.querySelectorAll('input[name="temas"]:checked');

    if (checkboxesMarcados.length === 0) {
        alert("No hay ningún tema seleccionado para eliminar.");
        return;
    }

    if (!confirm("¿Estás seguro de que quieres eliminar " + checkboxesMarcados.length + " tema(s)?")) {
        return;
    }

    checkboxesMarcados.forEach(checkbox => {
        const elementoPadre = checkbox.closest('.checkbox-item');
        if (elementoPadre) {
            elementoPadre.remove();
        }
    });

    validarCheckBoxes();
}
function pintar(campo, texto, estaBien, mensajeError) {
    if (estaBien) {
        campo.className = 'campo-ok';
        texto.textContent = 'Correcto';
        texto.className = 'msg-ok'; 
    } else {
        campo.className = 'campo-error';
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
    
    if (telefono.value.length < 9) { 
        pintar(telefono, texto, false, 'El número de teléfono debe tener al menos 9 dígitos');
    } else if (telefono.value.length > 9) {
        pintar(telefono, texto, false, 'El número de teléfono no puede tener más de 9 dígitos');
    } else {
        console.log('Teléfono válido');
        pintar(telefono, texto, true, '');
    }
}

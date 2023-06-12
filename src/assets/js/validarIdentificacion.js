function validarIdentificacion(identificacion) {
    // Eliminar espacios en blanco y guiones de la cédula
    let mensaje = '';
    let Identificacion = identificacion.replace(/\s|-/g, '');

    // Verificar que la cédula tenga 10 dígitos
    if (Identificacion.length !== 10) {
      mensaje = 'La cédula debe tener 10 dígitos';
      return;
    }

    // Obtener los primeros dos dígitos
    let provincia = parseInt(Identificacion.substr(0, 2), 10);

    // Verificar que los primeros dos dígitos estén en el rango válido
    if (provincia < 0 || provincia > 24) {
      mensaje = 'Los dos primeros dígitos deben estar entre 0 y 24';
      return;
    }

    // Obtener el tercer dígito
    let tercerDigito = parseInt(Identificacion.charAt(2), 10);

    // Verificar que el tercer dígito sea menor a 6
    if (tercerDigito > 5) {
      mensaje = 'El tercer dígito debe ser menor o igual a 5';
      return;
    }

    // Verificar que los siguientes dígitos sean consecutivos
    let consecutivo = true;
    for (let i = 3; i < 9; i++) {
      if (parseInt(Identificacion.charAt(i), 10) !== i - 2) {
        consecutivo = false;
        break;
      }
    }

    if (!consecutivo) {
      mensaje = 'Los dígitos del cuarto al noveno deben ser consecutivos';
      return;
    }

    // Verificar el dígito verificador
    let digitoVerificador = parseInt(Identificacion.charAt(9), 10);
    let coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < 9; i++) {
      let producto = coeficientes[i] * parseInt(Identificacion.charAt(i), 10);
      suma += producto >= 10 ? producto - 9 : producto;
    }

    let resultadoEsperado = (Math.ceil(suma / 10) * 10) - suma;
    if (resultadoEsperado !== digitoVerificador) {
      mensaje = 'El dígito verificador no es válido';
      return;
    }

    mensaje = 'La cédula es válida';

    return mensaje;
}

export default validarIdentificacion
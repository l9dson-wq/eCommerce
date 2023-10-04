const generarCodigoAleatorio = () => {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    let codigo = "";
  
    // Generar 6 letras aleatorias
    for (let i = 0; i < 6; i++) {
      const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
      codigo += letraAleatoria;
    }
  
    // Agregar un guion (-)
    codigo += "-";
  
    // Generar un número aleatorio
    const numeroAleatorio = Math.floor(Math.random() * 10);
    codigo += numeroAleatorio;
  
    return codigo;
}

module.exports = generarCodigoAleatorio;
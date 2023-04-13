const btnEncriptar = document.getElementById("encriptar");
const aceptado = document.getElementById("mensaje-respuesta");
const btnDesencriptar = document.getElementById("desencriptar");
const mensajeCopiado = document.getElementById("mensaje-copiado");
const notFound = document.getElementById("mensaje-error");
const btnCopiar = document.getElementById("copiar");
const btnBotones2 = document.getElementById("botones2");
let resultado = document.getElementById("datos-salida");

const encriptador = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
};

//Enfoque en el textarea para ingresar el mensaje a encriptar
document.getElementById("datos-entrada").focus();

//definicion de funcion para comprobar que se hallan ingresado caracteres al textarea
function comprobarEntrada(mensaje) {
    if (mensaje.length == 0) {
        notFound.style.display = "block";
        aceptado.style.display = "none";
        btnBotones2.style.display = "none";
        return false;
    } else {
        notFound.style.display = "none";
        aceptado.style.display = "block";
        btnBotones2.style.display = "block";
        return true;
    }
}

//defición de función para encriptar el mensaje ingresado
function encriptar(mensaje) {
    let mensajeEncriptado = "";
    if (comprobarEntrada(mensaje)) {
        for (let item in mensaje) {
            caracter = mensaje[item];
            if (Object.keys(encriptador).includes(caracter)) {
                mensajeEncriptado += encriptador[caracter];
            } else {
                mensajeEncriptado += caracter;
            }
        }
        resultado.innerHTML = mensajeEncriptado;
    }
}

//definicion de funcion para desencriptar el mensaje ingresado
function desencriptar(mensaje) {
    let regex = "";
    if (comprobarEntrada(mensaje)) {
        for (valor in encriptador) {
            if (mensaje.includes(encriptador[valor])) {
                regex = new RegExp(encriptador[valor], "g");
                mensaje = mensaje.replace(regex, valor);
            }
        }
        resultado.innerHTML = mensaje;
    }
}

btnEncriptar.addEventListener("click", function () {
    let mensaje = document.getElementById("datos-entrada").value;
    encriptar(mensaje.toLowerCase());
});

btnDesencriptar.addEventListener("click", function () {
    let mensaje = document.getElementById("datos-entrada").value;
    desencriptar(mensaje.toLowerCase());
});

btnCopiar.addEventListener("click", function () {
    let copiar = document.getElementById("datos-salida").value;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return (
            navigator.clipboard.writeText(copiar),
            (mensajeCopiado.innerHTML = "Copiado al portapapeles"),
            setTimeout(() => (mensajeCopiado.innerHTML = ""), 2000)
        );
    return Promise.reject("The Clipboard API is not available.");
});

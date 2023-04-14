document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    cc: "",
    asunto: "",
    mensaje: "",
  };

  //Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputCc = document.querySelector("#cc");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  //Asignar eventos
  inputEmail.addEventListener("blur", validar);
  inputCc.addEventListener("blur", validar);
  inputAsunto.addEventListener("blur", validar);
  inputMensaje.addEventListener("blur", validar);
  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      resetFormulario();

      //Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 2000);
    }, 2000);
  }

  function validar(e) {
    if (e.target.id === "cc") {
      if (!validarEmail(e.target.value, e.target.id)) {
        mostarAlerta(
          "El email secundario no es valido",
          e.target.parentElement
        );
        email[e.target.name] = "";
        return;
      }
    } else {
      if (e.target.value.trim() === "") {
        mostarAlerta(
          `El campo ${e.target.id} es obligatorio`,
          e.target.parentElement
        );
        email[e.target.name] = "";
        comprobarEmail();
        return;
      }
      if (
        e.target.id === "email" &&
        !validarEmail(e.target.value, e.target.id)
      ) {
        mostarAlerta("El email no es valido", e.target.parentElement);
        email[e.target.name] = "";
        comprobarEmail();
        return;
      }
    }

    limpiarAlerta(e.target.parentElement);
    //Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();
    //Comprobar el objeto Email
    comprobarEmail();
  }
  function mostarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    //Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    //Inyectar el error al formulario
    referencia.appendChild(error);
  }

  //Comprueba si ya existe una alerta
  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email, type) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (type == "cc" && email.trim() === "") {
      return true;
    }
    const resultado = regex.test(email);
    console.log(resultado);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      if (email.cc == "" && email.email != "" && email.asunto != "" && email.mensaje != "") {
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
        return;
      }
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function resetFormulario() {
    //Reiniciar el objeto
    email.email = "";
    email.cc = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});

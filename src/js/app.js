document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
}); //inicializar

function iniciarApp() {
  crearGaleria();
  scrollNav();
  navegacionFija();
} //invocar funciones

function navegacionFija(){
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");
  
  window.addEventListener('scroll', function(e){
    if(sobreFestival.getBoundingClientRect().bottom < 0){ //da la posición del scroll referente a un punto de referencia
      barra.classList.add('fijo');
      body.classList.add('body-scroll');
    }else{
      barra.classList.remove('fijo');
      body.classList.remove('body-scroll');
    };
  });
}


function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  enlaces.forEach((enlaces) => {
    enlaces.addEventListener("click", function (e) {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("PICTURE");
    imagen.innerHTML = `
    <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
    <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
    <img
      loading="lazy"
      width="200"
      height="300"
      src="build/img/thumb/${i}.jpg"
      alt="imagen galería"
    />`;

    galeria.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("PICTURE");
  imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.webp" type="image/webp" />
    <source srcset="build/img/grande/${id}.avif" type="image/avif" />
    <img
      loading="lazy"
      width="200"
      height="300"
      src="build/img/grande/${id}.jpg"
      alt="imagen galería"
    />`;

  //Crea el overlay con la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  //Botón para cerrar la el modal
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");
  cerrarModal.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  overlay.appendChild(cerrarModal);

  //Lo añade al HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}

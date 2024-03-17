const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");

//IMÁGENES
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const cache = require("gulp-cache");
const avif = require("gulp-avif");

function css(done) {
  // Identificar el archivo de sass
  // Compilarlo .pipe()
  // Almacenar en el disco duro .dest()

  src("src/scss/**/*.scss")
  .pipe(plumber()) //evita que se detenga el programa
  .pipe(sass())
  .pipe(dest("build/css"));
  
  done(); //Callback que avisa a gulp cuando llegamos al final
}

//Pasa imágenes a formato webp
function versionWebp(done){
  const opciones = {
    quality: 50
  };

  src("src/img/**/*{png,jpg}")
  .pipe(webp(opciones))
  .pipe(dest("build/img"))

  done(); //Callback que avisa
}

//Aligera imágenes
function imagenes(done){
  const opciones ={
    optimizationLevel: 3
  };
  src("src/img/**/*{png,jpg}")
  .pipe(cache(imagemin(opciones)))
  .pipe(dest("build/img"));

  done(); //Callback
}

//Para imágenes a formato avif
function versionAvif(done){
  const opciones = {
    quality: 50
  };
  src("src/img/**/*{png,jpg}")
  .pipe(avif(opciones))
  .pipe(dest("build/img"))

  done(); //Callback
}



function dev(done){
  watch("src/scss/**/*.scss", css) /* 'ast ast / ast' detecta todos los aravicos .scss */
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);

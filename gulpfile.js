const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//JS
const terser = require("gulp-terser-js");


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
  .pipe(sourcemaps.init())
  .pipe(plumber()) //evita que se detenga el programa
  .pipe(sass())
  .pipe(postcss([autoprefixer(), cssnano()])) //UNIFICA TODO EL CÓDIGO CSS, SE HACE AL FINAL
  .pipe(sourcemaps.write('.')) //el punto indica que se guardara en el mismo lugar de css
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
  .pipe(dest("build/img"));

  done(); //Callback
}

function javascript(done){
  src("src/js/**/*.js")
  .pipe(sourcemaps.init())
  .pipe(terser())//Mejora el código de JS
  .pipe(sourcemaps.write())
  .pipe(dest("build/js"));

  done(); //Callback
} 


function dev(done){
  watch("src/scss/**/*.scss", css); /* 'ast ast / ast' detecta todos los aravicos .scss */
  watch("src/js/**/*.js", javascript);

  done(); //Callback
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(javascript, dev);
//imagenes, versionWebp, versionAvif, 
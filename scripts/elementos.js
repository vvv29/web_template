function crearElementos() {
    elementosMaqueta.forEach(mostrarElementoCliqueable);
    botonesMaqueta.forEach(mostrarElementoCliqueable);
    mostrarRecuadro(recuadroInformacion);
    mostrarRecuadro(recuadroMaqueta);
}

function mostrarRecuadro(recuadro) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.id = recuadro;
    div.className = 'resize-drag';
    div.style.width = tamX[recuadro];
    div.style.height = tamY[recuadro];
    div.style.position = 'absolute';
    div.style.left = posX[recuadro];
    div.style.top = posY[recuadro];
    div.innerHTML = contenido[recuadro];
    if (configuracion) {
        div.style.border = '1px solid black';    
    }    

}

function mostrarElementoCliqueable(elemento) {
    var container = document.getElementById('contenedor');
    var div = document.createElement('div');
    //document.body.appendChild(div);
    container.appendChild(div);
    div.id = elemento;
    div.className = 'resize-drag';
    div.style.width = tamX[elemento];
    div.style.height = tamY[elemento];
    div.style.position = 'absolute';
    div.style.left = posX[elemento]
    div.style.top = posY[elemento];
    div.style.zIndex = 1;
    div.style.backgroundImage = 'url('+imagen[elemento]+')';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundPosition = 'center center';
    div.style.backgroundSize = 'auto';
    if (configuracion) {
        div.style.border = '1px solid black';    
        div.innerHTML = '<span style="background-color: white">'+div.id+'</span>';
    }
    div.addEventListener('click', clickElemento, false);
}

function clickElemento() {
    //elementosMaqueta.forEach(resetearImagen);
    elementosMaqueta.forEach(ocultarImagen);
    botonesMaqueta.forEach(resetearImagen);
    this.style.backgroundImage = 'url('+imagenClick[this.id]+')';
    var recuadroi = document.getElementById(recuadroInformacion);
    var recuadrom = document.getElementById(recuadroMaqueta);
    if (elementosMaqueta.includes(this.id)) {
        recuadroi.innerHTML = contenido[this.id];
        recuadrom.innerHTML = contenido[recuadroMaqueta];
        setTimeout(resetearMaqueta, tiempoReset[this.id]);    
    }
    if (botonesMaqueta.includes(this.id)) {
        recuadrom.innerHTML = contenido[this.id];
        recuadroi.innerHTML = contenido[recuadroInformacion];        
        setTimeout(resetearMaqueta, tiempoReset[this.id]);
    }
}

function resetearMaqueta() {
    elementosMaqueta.forEach(resetearImagen);
    botonesMaqueta.forEach(resetearImagen);
    var recuadroi = document.getElementById(recuadroInformacion);
    var recuadrom = document.getElementById(recuadroMaqueta);
    recuadroi.innerHTML = contenido[recuadroInformacion]; 
    recuadrom.innerHTML = contenido[recuadroMaqueta];    
}

function resetearImagen(elemento) {
    var div = document.getElementById(elemento);    
    div.style.backgroundImage = 'url('+imagen[elemento]+')';
}

function ocultarImagen(elemento) {
    var div = document.getElementById(elemento);    
    div.style.backgroundImage = 'none';
}

function mostrarResultados() {
    elementosMaqueta.forEach(obtenerPosiciones);
    botonesMaqueta.forEach(obtenerPosiciones);
    obtenerPosiciones(recuadroInformacion);
    obtenerPosiciones(recuadroMaqueta);       
    var modal = document.getElementById('resultados');
    var modalContent = document.getElementById('contenido-resultados');
    modal.style.display = "block";
    modalContent.innerText += resultados;
}

function obtenerPosiciones(elemento) {
    var div = document.getElementById(elemento);
    var rect = div.getBoundingClientRect();
    var posX = rect.left; // - 20;
    var posY = rect.top; // - 30;
    var tamX = div.offsetWidth;
    var tamY = div.offsetHeight;
    resultados += "posX['" + elemento + "'] = '" + posX + "';\n";
    resultados += "posY['" + elemento + "'] = '" + posY + "';\n";
    resultados += "tamX['" + elemento + "'] = '" + tamX + "';\n";
    resultados += "tamY['" + elemento + "'] = '" + tamY + "';\n";
    resultados += "\n";
}


function copiarResultados() {
    var modalContent = document.getElementById('contenido-resultados');
    modalContent.select();
    document.execCommand('copy');
}

function cerrarResultados() {
    var modal = document.getElementById('resultados');
    modal.style.display = "none";
}

if (window.addEventListener) {
  window.addEventListener('load', crearElementos, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', crearElementos);
}


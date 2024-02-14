// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let precio = 0;
let isValid=true;
let contador=0;
let costoTotal=0;
let TotalEnProductos=0;

let tablaListaCompras= document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

//Limpia toda la lista de compras incluyendo los campos
btnClear.addEventListener("click",function(event){
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value=""; //Se vacia con tipo de dato string porque el campo es tipo string
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border= "";
    txtNumber.style.border= "";
    contador=0;
    costoTotal=0;
    TotalEnProductos=0;
    contadorProductos.innerText = contador;
    productosTotal.innerText = TotalEnProductos;
    precioTotal.innerText =`$ ${costoTotal.toFixed(2)}`;
    cuerpoTabla.innerHTML="";
    //Guardar en almecenamiento del navegador
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("TotalEnProductos",TotalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);

    txtNombre.focus();

});//btnClear

    function validarCantidad(){
        if(txtNumber.value.length==0){
            return false;
        }//if length me valida que tenga un dato

        if(isNaN(txtNumber.value)){
            return false;
        }//isNaN me valida que sea un numero
        if(Number(txtNumber.value)<=0){
            return false;
        }//Numero <=0 me valida que el numero sea mayor a 0
       
        return true;
    }//validarCantidad

    function getPrecio(){
       return parseInt((Math.random()*90)*100)/100; //Para deborver dos decimales *100/100,el 90 es para que sean numeros de 0-90
    }//getPrecio

btnAgregar.addEventListener("click",function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border= "";
    txtNumber.style.border= "";
    isValid=true;


    txtNombre.value = txtNombre.value.trim(); //Para quita los espacios esto es para que no te ingrese puros espacios
    txtNumber.value = txtNumber.value.trim();
    if(txtNombre.value.length<3){
        alertValidacionesTexto.insertAdjacentHTML("beforeend",` El <strong>Nombre </strong> no es correcto<br/>`);
        alertValidaciones.style.display="block"; //Le quita el display:none que tiene el alert en el HTML
                                                //display:none es para mantener oculto el elemento entonces
                                                //se mantiene oculto hasta que le cambias el display.
        txtNombre.style.border= "solid red thin" //Para señalar el campo que esta mal
        isValid=false;
    };//if length

    if(! validarCantidad()){
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`
         La <strong>Cantidad </strong> no es correcta<br/>`);
        alertValidaciones.style.display="block";
        txtNumber.style.border= "solid red thin"; //Para señalar el campo que esta mal
        isValid=false;
    };//if ! validarCantidad
    
    if(isValid){
        contador++;
        precio=getPrecio();
        row =`<tr>
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>
        `;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        contadorProductos.innerText = contador;
        TotalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerText = TotalEnProductos;
        costoTotal += precio*parseFloat(txtNumber.value);
        precioTotal.innerText =`$ ${costoTotal.toFixed(2)}`;

        //Guardar en almecenamiento del navegador
        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("TotalEnProductos",TotalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);
        


        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

    }//If isValid
    

});//btnAgregar


//Cargue los datos guardados
window.addEventListener("load", function(event){
    event.preventDefault();
   if(this.localStorage.getItem("contadorProductos")!=null){
    contador = Number(this.localStorage.getItem("contadorProductos"));
    TotalEnProductos = Number(this.localStorage.getItem("TotalEnProductos"));
    costoTotal = Number(this.localStorage.getItem("costoTotal"));
    
    contadorProductos.innerText = contador;
    productosTotal.innerText = TotalEnProductos;
    precioTotal.innerText =`$ ${costoTotal.toFixed(2)}`;


   }
})
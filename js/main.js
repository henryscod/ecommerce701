// CARGAR PEDIDOS EN TABLA

// Variables globales

const divProducto = document.querySelector(".product__container");
const tablaPedido = document.querySelector("#products__table");
// let itemsCart     = JSON.parse(localStorage.getItem("item"));

let arrayProducto = [];



// Funciones

const crearProducto = (nombreProducto, precio, cantidad,total) => {
  let producto = {
    nombre: nombreProducto,
    precio: precio,
    cantidad: 1,
    total: precio, 
  };

  arrayProducto.push(producto);
};



//   Guardar producto en localstorage

const guardarDB = () => {
  localStorage.setItem("item", JSON.stringify(arrayProducto));
};

// const guardarCart = () =>{
//   let cartArray = JSON.parse(localStorage.getItem("item"));
//   localStorage.setItem("cart", JSON.stringify(cartArray));
// }


// Insertar datos en tabla

const insertarTabla = () => {
  tablaPedido.innerHTML = "";
  let itemsCart = JSON.parse(localStorage.getItem("item"));

  // console.log("arrayProducto");

  if (itemsCart === null) {
    arrayProducto = [];
    // console.log('nada')
  } else {

      itemsCart.forEach((element) => {
        tablaPedido.innerHTML += `<tr>
                    <td scope="row">${element.nombre}</td>
                    <td class="text-center">
                        
                            <div class=" d-flex input__cant">
                                <a class="cart_cantidad_restar btn btn-outline-dark" href="#"> - </a>
                                <p class="cart_quantity">${element.cantidad}</p>
                                <a class="cart_cantidad_sumar btn btn-outline-dark" href="#"> + </a>
                            </div>
                        
                    </td>
                    <td class="text-center td-total"><p>Bs.${element.total}</p> </td>
                    <td class="text-center "><button class="button_delete" onclick="accionesBorrar()"><i class="fa-solid fa-trash "></i></button></td>
                </tr>`;
      });
    }
  };

 // <input class="cart_quantity_input" type="text" value=${element.cantidad} size="1" disabled>

// Listeners para guardar productos

divProducto.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(e);

  let itemsCart      = JSON.parse(localStorage.getItem("item"));
  let nombreProducto = e.path[1].childNodes[1].innerText;
  let precio         = e.path[1].childNodes[3].children[1].innerText;
  // console.log(itemsCart);

  if (e.target.innerHTML === "Agregar") {
    if (itemsCart == null) {
      crearProducto(nombreProducto,precio);
      guardarDB();
      cantItems();
    } else {
      let res = itemsCart.find(element => element.nombre == nombreProducto)
      if (res === undefined){
        crearProducto(nombreProducto,precio);
        guardarDB();
        cantItems();
      }
    }
  }
});


  // Contador de items en cart-index
const cantItems = () => {
  let divCart = document.querySelector(".button__cart");
  let cant = JSON.parse(localStorage.getItem("item")).length;
  divCart.innerHTML = "";

  if (cant > 0) {
    divCart.innerHTML = `
    <i class="fa-solid fa-cart-shopping"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-secondary">${cant}</span>
    `;
  } else {
    console.log("no se pudo cargar total de items");
  }
};










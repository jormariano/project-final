const botonBuscar1 = document.getElementById('BotonBuscar1');
const botonSaludo = document.getElementById('botonSaludo');

// Esta linkeado con indexRouter.js del Backend
botonSaludo.addEventListener('click', () => {
  fetch('http://localhost:8000/saludo')
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        'divSaludo'
      ).innerHTML = `Este es tu saludo: ${data.mensaje}`;
    })
    .catch((e) => console.log(e));
});

botonBuscar1.addEventListener('click', () => {
  fetch('http://localhost:8000/api/products')
    .then((res) => res.json())
    .then((prods) => {
      console.log(prods);
    });
});

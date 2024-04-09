import productModel from '../models/product.js';

export const getProducts = async (limit, pages, filter, ord) => {
  // Puede modificarse el metodo a filtrar por status o category
  let metFilter;

  // Si la pagina enviada (pages) es distinta de undefined se consulta por pages, sino por defecto consulto por 1
  const page = pages != undefined ? pages : 1;

  const limi = limit != undefined ? limit : 10;

  // filtramos por status(disponibilidad) y sino por categoria
  if (filter == 'true' || filter == 'false') {
    metFilter = 'status';
  } else {
    if (filter !== undefined) metFilter = 'category';
  }

  const query = metFilter != undefined ? { [metFilter]: filter } : {};

  // Consulto por el metodo de ordenamiento: http://localhost:8000/api/products?&ord=desc
  const ordQuery = ord !== undefined ? { price: ord } : {};

  // .paginate({metodo de ordenamiento}, {limite}, {page}); Asi decis que se filtra por eso:
  // Se filtra aca porque puede filtrar por status o por category
  const prods = await productModel.paginate(query, {
    limit: limi,
    pages: page,
    sort: ordQuery,
  });

  return prods;
};

export const getProduct = async (idProduct) => {
  const prod = await productModel.findById(idProduct);
  return prod;
};

export const createProduct = async (product) => {
  const message = await productModel.create(product);
  return message;
};

export const updateProduct = async (idProduct, upProduct) => {
  const message = await productModel.findByIdAndUpdate(idProduct, upProduct);
  return message;
};

export const deleteProduct = async (idProduct) => {
  const message = await productModel.findByIdAndDelete(idProduct);
  return message;
};

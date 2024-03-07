const fs = require("fs");

const filename = `${__dirname}/../assets/Products.json`;

class ProductManager {
  #products;
  lastId;

  constructor() {
    this.lastId = 0;
  }

  async initialize() {
    this.#products = await this.getProductos();
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const producto = {
      id: this.getNuevoId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const productsArray = await this.getProductos();

    productsArray.push(producto);

    const fileContents = JSON.stringify(productsArray, null, "\t");

    await fs.promises.writeFile(filename, fileContents);
  }

  async getProductos() {
    try {
      const fileContents = await fs.promises.readFile(filename);
      const existinProducts = JSON.parse(fileContents);

      return existinProducts;
    } catch (err) {
      return [];
    }
  }

  getNuevoId() {
    this.lastId += 1;
    return this.lastId;
  }

  async getProductById(idproducto) {
    try {
      const fileContents = await fs.promises.readFile(filename);
      const existinProducts = JSON.parse(fileContents);

      const productoBuscado = existinProducts.find(
        (prod) => prod.id == idproducto
      );
      if (productoBuscado) {
        console.log("Producto encontrado:", productoBuscado);
        const productJSON = JSON.stringify(productoBuscado);
        return productJSON;
      }
    } catch (err) {
      console.error("Not found");
    }
  }

  async updateProductById(
    idproducto,
    newTitle,
    newDescription,
    newPrice,
    newThumbnail,
    newCode,
    newStock
  ) {
    try {
      const fileContents = await fs.promises.readFile(filename);
      const existinProducts = JSON.parse(fileContents);

      const productoIndice = existinProducts.findIndex(
        (prod) => prod.id == idproducto
      );

      if (productoIndice !== -1) {
        existinProducts[productoIndice] = {
          id: idproducto,
          title: newTitle,
          description: newDescription,
          price: newPrice,
          thumbnail: newThumbnail,
          code: newCode,
          stock: newStock,
        };

        await fs.promises.writeFile(
          filename,
          JSON.stringify(existinProducts, null, 2),
          "utf-8"
        );
        console.log("¡Producto actualizado correctamente!");
      } else {
        console.error("Producto no encontrado");
      }
    } catch (err) {
      console.error("Error:", error.message);
    }
  }

  async deleteProductById(idproducto) {
    try {
      const fileContents = await fs.promises.readFile(filename);
      const existinProducts = JSON.parse(fileContents);

      const productoIndice = existinProducts.findIndex(
        (prod) => prod.id == idproducto
      );

      if (productoIndice !== -1) {
        existinProducts.splice(productoIndice, 1);

        await fs.promises.writeFile(
          filename,
          JSON.stringify(existinProducts, null, 2),
          "utf8"
        );
        console.log("¡Producto borrado correctamente!");
      } else {
        console.error("Producto no encontrado");
      }
    } catch (err) {
      console.error("Error al borrar el producto:", err.message);
    }
  }
}

// const main = async () => {
//   const manager = new ProductManager();

//   // Agregando Productos

//   await manager.addProduct(
//     "manzana",
//     " manzana roja",
//     23,
//     "rutadeimagen",
//     "43g34g34r4tt4",
//     12
//   );

//   await manager.addProduct(
//     "banana",
//     " banana amarilla",
//     12,
//     "rutadeimagen",
//     "54754645hfvhfgh",
//     56
//   );

//   await manager.addProduct(
//     "sandia",
//     "sandia verde",
//     45,
//     "rutadeimagen",
//     "546regergdfg4",
//     34
//   );

//   // consultando todos los productos
//   console.log(await manager.getProductos());

//   // consultando un producto especifico por id
//   await manager.getProductById(1);

//   // actualizando un producto por Id
//   await manager.updateProductById(
//     1,
//     "uva",
//     "uva morada",
//     23,
//     "rutaimagen",
//     "sdfdsfsdf",
//     34
//   );

//   await manager.deleteProductById(3);
// };

// main();

module.exports = { ProductManager };

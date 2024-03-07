const { ProductManager } = require("./productManager");
const express = require("express");
const productsManagers = new ProductManager();
const app = express();

// EndPoint que devuelve todos los productos desde el products.json
app.get("/products", async (req, res) => {
  try {
    const prods = await productsManagers.getProductos();

    res.json(prods);
    return;
  } catch (error) {
    res.json({ error: "Error al obterner usuarios" });
  }
});

// EndPoint que devuelve todos los productos desde el products.json pero con limite enviado por query atravez de url
app.get("/limit-products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);

    const totalProducts = await productsManagers.getProductos();

    const limitedProducts = totalProducts.slice(0, limit);
    console.log(` Los productos devueltos con limite son : ${limitedProducts}`);
    res.json({
      totalProducts: limitedProducts.length,
      products: limitedProducts,
    });
  } catch (error) {
    res.json({ error: "Error al obtener productos" });
  }
});

// EndPoint que devuelve solo el producto desde el products.json con su respectivo id

app.get("/products/:pid", async (req, res) => {
  try {
    const product = await productsManagers.getProductById(req.params.pid);

    if (!product) {
      res.json({ error: ` producto por id:${req.params.pid}  no existe` });
      return;
    }
    {
      res.json(product);
      return;
    }
  } catch (error) {
    res.json({ error: "Error al obterner producto por id " });
  }
});

app.listen(3000, () => {
  console.log(`Funciona perfecto el servidor `);
});

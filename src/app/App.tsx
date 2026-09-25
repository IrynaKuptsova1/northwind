import { useEffect, useState } from "react";

import "./App.css";

type Product = {
  productId: number;
  productName: string | null;
  supplierId: number | null;
  categoryId: number | null;
  quantityPerUnit: string | null;
  unitPrice: number | null;
  unitsInStock: number | null;
  unitsOnOrder: number | null;
  reorderLevel: number | null;
  discontinued: number | null;
};

type ProductsResponse = {
  total: number;
  data: Product[];
};

const limit = 20;

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetch(`/products?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((result: ProductsResponse) => {
        setProducts(result.data);
        setTotal(result.total);
      });
  }, [offset]);

  return (
    <>
      <header className="header">
        <a className="logo" href="/">
          Northwind Traders
        </a>

        <nav>
          <button type="button" className="nav-button active">
            Products
          </button>
        </nav>
      </header>

      <main>
        <section className="content">
          <div className="page-header">
            <div>
              <h1>Products</h1>
              <p>{total} products</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Supplier ID</th>
                  <th>Category ID</th>
                  <th>Quantity Per Unit</th>
                  <th>Unit Price</th>
                  <th>Units In Stock</th>
                  <th>Units On Order</th>
                  <th>Reorder Level</th>
                  <th>Discontinued</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.supplierId}</td>
                    <td>{product.categoryId}</td>
                    <td>{product.quantityPerUnit}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.unitsInStock}</td>
                    <td>{product.unitsOnOrder}</td>
                    <td>{product.reorderLevel}</td>
                    <td>{product.discontinued}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  className={pageNumber === page ? "page active" : "page"}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;

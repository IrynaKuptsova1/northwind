import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

type Column<T> = {
  id: string;
  label: string;
  render: (row: T) => ReactNode;
};

type EntityConfig<T> = {
  title: string;
  endpoint: string;
  columns: Column<T>[];
};

type EntityResponse<T> = {
  total: number;
  data: T[];
};

type Product = {
  productId: number;
  productName: string | null;
  quantityPerUnit: string | null;
  unitPrice: number | null;
  unitsInStock: number | null;
  unitsOnOrder: number | null;
};

const productConfig: EntityConfig<Product> = {
  title: "Products",
  endpoint: "/products",

  columns: [
    {
      id: "name",
      label: "Name",
      render: (product) => (
        <Link to={`/products/${product.productId}`}>{product.productName}</Link>
      ),
    },
    {
      id: "quantityPerUnit",
      label: "Qt per unit",
      render: (product) => product.quantityPerUnit,
    },
    {
      id: "unitPrice",
      label: "Price",
      render: (product) =>
        product.unitPrice === null ? "" : `$${product.unitPrice}`,
    },
    {
      id: "unitsInStock",
      label: "Stock",
      render: (product) => product.unitsInStock,
    },
    {
      id: "unitsOnOrder",
      label: "Orders",
      render: (product) => product.unitsOnOrder,
    },
  ],
};

function EntityTable<T>({
  data,
  columns,
}: {
  data: T[];
  columns: Column<T>[];
}) {
  return (
    <table className="entity-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.id}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EntityPage<T>({ config }: { config: EntityConfig<T> }) {
  const LIMIT = 20;

  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * LIMIT;
  const totalPages = Math.ceil(total / LIMIT) || 1;

  useEffect(() => {
    async function loadEntity() {
      const response = await fetch(
        `${config.endpoint}?limit=${LIMIT}&offset=${offset}`,
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result: EntityResponse<T> = await response.json();

      setData(result.data);
      setTotal(result.total);
    }

    void loadEntity();
  }, [config.endpoint, offset]);

  return (
    <section className="entity-page">
      <div className="entity-header">
        <h1>{config.title}</h1>

        <button
          type="button"
          className="refresh-button"
          onClick={() => window.location.reload()}
          aria-label={`Refresh ${config.title}`}
        >
          ↻
        </button>
      </div>

      <div className="entity-card">
        <EntityTable data={data} columns={config.columns} />

        <div className="pagination">
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={
                    pageNumber === page ? "page-button active" : "page-button"
                  }
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ),
            )}
          </div>

          <div className="page-info">
            Page {page} of {totalPages}
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return <div className="placeholder-page">Home</div>;
}

function Dashboard() {
  return <div className="placeholder-page">Dashboard</div>;
}

function Search() {
  return <div className="placeholder-page">Search</div>;
}

function PlaceholderEntity({ title }: { title: string }) {
  return (
    <section className="entity-page">
      <div className="entity-header">
        <h1>{title}</h1>
      </div>
    </section>
  );
}

function Layout() {
  const [isLinksOpen, setIsLinksOpen] = useState(false);

  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        linksRef.current &&
        !linksRef.current.contains(event.target as Node)
      ) {
        setIsLinksOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-title">Northwind Traders</div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">General</div>

          <Link to="/" className="sidebar-link">
            Home
          </Link>

          <Link to="/dashboard" className="sidebar-link">
            Dashboard
          </Link>
        </div>

        <div className="sidebar-section">
          <Link to="/suppliers" className="sidebar-link">
            Suppliers
          </Link>

          <Link to="/products" className="sidebar-link">
            Products
          </Link>

          <Link to="/orders" className="sidebar-link">
            Orders
          </Link>

          <Link to="/employees" className="sidebar-link">
            Employees
          </Link>

          <Link to="/customers" className="sidebar-link">
            Customers
          </Link>

          <Link to="/search" className="sidebar-link">
            Search
          </Link>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <button type="button" className="menu-button" aria-label="Open menu">
            ☰
          </button>

          <div className="header-time">{/* Reserved for time */}</div>

          <div className="sqlite-links" ref={linksRef}>
            <button
              type="button"
              className="sqlite-links-button"
              onClick={() => setIsLinksOpen((value) => !value)}
            >
              SQLite Links
              <span>⌄</span>
            </button>

            {isLinksOpen && (
              <div className="sqlite-links-menu">
                <a
                  href="https://blog.cloudflare.com/reintroducing-d1/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Reintroducing D1
                </a>

                <a
                  href="https://developers.cloudflare.com/d1/reference/sql-statements/"
                  target="_blank"
                  rel="noreferrer"
                >
                  SQLite SQL Flavour
                </a>

                <a
                  href="https://developers.cloudflare.com/durable-objects/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Durable Objects
                </a>
              </div>
            )}
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/search" element={<Search />} />

          <Route
            path="/products"
            element={<EntityPage config={productConfig} />}
          />

          <Route
            path="/suppliers"
            element={<PlaceholderEntity title="Suppliers" />}
          />

          <Route
            path="/orders"
            element={<PlaceholderEntity title="Orders" />}
          />

          <Route
            path="/employees"
            element={<PlaceholderEntity title="Employees" />}
          />

          <Route
            path="/customers"
            element={<PlaceholderEntity title="Customers" />}
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from "react";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch("/products");
      const data = await response.json();

      setResponse(JSON.stringify(data, null, 2));
    }

    void loadProducts();
  }, []);

  return <div>{response}</div>;
}

export default App;

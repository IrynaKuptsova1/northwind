type Column<T> = {
  id: string;
  label: string;
  render: (row: T) => React.ReactNode;
};

type EntityTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

function EntityTable<T>({
  data,
  columns,
}: EntityTableProps<T>) {
  return (
    <table className="entity-tabё le">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.id}>
                {column.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
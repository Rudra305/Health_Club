import { Pagination, Table } from "react-bootstrap";
import usePagination from "../../../usePagination";

const PAGE_LENGTH = 10;

const PaginatedTable = (props) => {
  const { items, cols } = props;

  const [paginatedItems, pageCount, currentPage, setCurrentPage] =
    usePagination(items, PAGE_LENGTH);

  return (
    <>
      <div className="table-responsive">
        <Table hover className="mb-4">
          <thead>
            <tr>
              {cols.map((col, idx) => (
                <th key={col.name || idx}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {cols.map((col, i) => {
                    if (col.renderer) {
                      return (
                        <td key={i}>
                          <col.renderer val={item[i]} />
                        </td>
                      );
                    }
                    return <td key={i} className="text-capitalize">{item[i]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {pageCount > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <Pagination>
            {Array(pageCount)
              .fill(0)
              .map((_, i) => {
                return (
                  <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => setCurrentPage(i)}
                  >
                    {i + 1}
                  </Pagination.Item>
                );
              })}
          </Pagination>
        </div>
      )}
    </>
  );
};

export default PaginatedTable;

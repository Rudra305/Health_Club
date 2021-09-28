import React from "react";
import { Pagination, Table } from "react-bootstrap";
import usePagination from "../../../usePagination";

const PAGE_LENGTH = 10;

const PaginatedTable = (props) => {
  const { items, cols } = props;

  const [paginatedItems, pageCount, currentPage, setCurrentPage] =
    usePagination(items, PAGE_LENGTH);

  return (
    <>
      <Table bordered hover className="shadow mb-4">
        <thead>
          <tr>
            {cols.map((col) => (
              <th>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => {
            return (
              <tr>
                {cols.map((col, i) => {
                  if (col.renderer) {
                    return (
                      <td>
                        <col.renderer val={item[i]} />
                      </td>
                    );
                  }
                  return <td className="text-capitalize">{item[i]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Pagination>
          {Array(pageCount)
            .fill(0)
            .map((page, i) => {
              return (
                <Pagination.Item
                  active={i === currentPage}
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </Pagination.Item>
              );
            })}
        </Pagination>
      </div>
    </>
  );
};

export default PaginatedTable;

import Pagination from "react-bootstrap/Pagination";

const PaginationTabla = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handlePageChange,
  centrado = false,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={"d-flex justify-content" + (centrado ? "-center" : "-end")}>
      <Pagination size="sm">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        />
        <Pagination.Last onClick={() => handlePageChange(pageNumbers.length)} />
      </Pagination>
    </div>
  );
};

export default PaginationTabla;

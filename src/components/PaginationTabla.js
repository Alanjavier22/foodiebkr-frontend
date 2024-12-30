import Pagination from "react-bootstrap/Pagination";

const PaginationTabla = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPagesToShow = 5;
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    // Si hay menos páginas que el máximo a mostrar, mostrar todas
    startPage = 1;
    endPage = totalPages;
  } else {
    // Si hay más páginas, calcular el inicio y el fin para mostrar solo unas pocas páginas
    if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
      endPage = currentPage + Math.floor(maxPagesToShow / 2);
    }
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-end px-3 pt-3 border-t-2">
      <Pagination size="sm">
        <Pagination.First
          className="w-8 text-center"
          onClick={() => handlePageChange(1)}
        />
        <Pagination.Prev
          className="w-8 text-center"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            id={number === currentPage ? "Pag-Bg-Act" : "Pag-Bg"}
            className="min-w-8 text-center"
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          className="w-8 text-center"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          className="w-8 text-center"
          onClick={() => handlePageChange(totalPages)}
        />
      </Pagination>
    </div>
  );
};

export default PaginationTabla;

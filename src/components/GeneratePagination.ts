//  function generates a pagination array based on the current page and the total number of pages
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 4 pages, show the first 5 pages and an ellipsis.
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  // If the current page is among the last 4 pages, show an ellipsis, the last 5 pages.
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // If the current page is among the middle pages, show an ellipsis on both sides.
  return [
    1,
    "...",
    currentPage - 3,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    currentPage + 3,
    "...",
    totalPages,
  ];
};

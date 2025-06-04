import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Pagination = ({
  totalCount,
  recordsPerPage = 30,
  maxVisiblePages = 10,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);

  const totalPages = Math.ceil(totalCount / recordsPerPage);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(pageFromUrl);
    setStartIndex(Math.max(1, pageFromUrl - Math.floor(maxVisiblePages / 2)));
  }, [searchParams, totalCount]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };

  const handlePrev = () => {
    if (startIndex > 1) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + maxVisiblePages - 1 < totalPages) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const visiblePages = Array.from(
    { length: maxVisiblePages },
    (_, i) => startIndex + i
  ).filter((page) => page <= totalPages);

  return (
    <Box
      sx={{ width: "100%", mt: 5, display: "flex", justifyContent: "center" }}
    >
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Button
          variant="outlined"
          onClick={handlePrev}
          disabled={startIndex === 1}
          sx={{ minWidth: 40 }}
        >
          <ChevronLeftIcon />
        </Button>

        {visiblePages.map((page) => (
          <Button
            key={page}
            variant="contained"
            onClick={() => handlePageClick(page)}
            sx={{
              minWidth: 36,
              backgroundColor: "#4caf50",
              color: "#fff",
              fontWeight: currentPage === page ? "bold" : "normal",
              boxShadow: currentPage === page ? 4 : "none",
              "&:hover": {
                backgroundColor: "#43a047",
              },
            }}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outlined"
          onClick={handleNext}
          disabled={startIndex + maxVisiblePages - 1 >= totalPages}
          sx={{ minWidth: 40 }}
        >
          <ChevronRightIcon />
        </Button>
      </Stack>
    </Box>
  );
};

export default Pagination;

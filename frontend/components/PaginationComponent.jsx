import React from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ count, page, onChange }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={(_, value) => onChange(value)}
      sx={{ mt: 2, mb: 4, button: { color: "#000" } }}
    />
  );
};

export default PaginationComponent;
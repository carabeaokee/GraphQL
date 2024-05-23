import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortProps {
  onSortChange: (sortOrder: string[]) => void;
}

export default function Sort({ onSortChange }: SortProps) {
  const [sortOrder, setSortOrder] = React.useState<string>("asc");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value);
    onSortChange(mapSortOrderToMediaSort(event.target.value));
  };

  const mapSortOrderToMediaSort = (sortOrder: string): string[] => {
    switch (sortOrder) {
      case "title-asc":
        return ["TITLE_ENGLISH"];
      case "title-desc":
        return ["TITLE_ENGLISH_DESC"];
      case "title-asc":
        return ["TITLE_ROMAJI"];
      case "title-desc":
        return ["TITLE_ROMAJI_DESC"];
      case "popularity-asc":
        return ["POPULARITY"];
      case "popularity-desc":
        return ["POPULARITY_DESC"];
      case "averageScore-asc":
        return ["SCORE"];
      case "averageScore-desc":
        return ["SCORE_DESC"];
      case "year-asc":
        return ["START_DATE"];
      case "year-desc":
        return ["START_DATE_DESC"];
      default:
        return [];
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortOrder}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={"year-asc"}>Season Year: Oldest to Newest</MenuItem>
          <MenuItem value={"year-desc"}>Season Year: Newest to Oldest</MenuItem>
          <MenuItem value={"title-asc"}>Title: A-Z</MenuItem>
          <MenuItem value={"title-desc"}>Title: Z-A</MenuItem>
          <MenuItem value={"popularity-asc"}>Popularity: Low to High</MenuItem>
          <MenuItem value={"popularity-desc"}>Popularity: High to Low</MenuItem>
          <MenuItem value={"averageScore-asc"}>
            Average Score: Low to High
          </MenuItem>
          <MenuItem value={"averageScore-desc"}>
            Average Score: High to Low
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

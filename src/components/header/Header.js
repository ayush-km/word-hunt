import {
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import "./Header.css";
import { categories } from "../../data/category";

function Header({ word, setWord, category, setCategory, lightMode }) {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode?"#000":"#fff",
      },
      type: lightMode?"light":"dark",
    },
  });

  function handleChange(e) {
    setWord("");
    setCategory(e);
  }

  return (
    <div className="header">
      <span className="title">{word ? word : "Word Hunt"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
            label="Search a word"
          />
          <TextField
            className="select"
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e.target.value)}
          >
            {categories.map((options) => (
              <MenuItem key={options.label} value={options.label}>
                {options.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Header;

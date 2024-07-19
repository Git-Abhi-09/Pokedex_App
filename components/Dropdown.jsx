import React, { useState } from 'react';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

const Dropdown = (props) => {
  const [selectValue, setSelectValue] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(typeof value === 'string' ? value.split(',') : value);
    props.setOptions(value);
  };

  return (
    <>
      <FormControl sx={{ width: "200px" }}>
      <InputLabel id="demo-multiple-checkbox-label">{props.optionName}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          label="age"
          multiple
          value={selectValue}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {props?.Options?.map((options) => (
            <MenuItem key={options.id} value={options.value}>
              <ListItemIcon>
                <Checkbox
                  name="select-checkbox"
                  checked={selectValue.includes(options.value)}
                />
              </ListItemIcon>
              <ListItemText primary={options.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Dropdown;

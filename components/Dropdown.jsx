import {
  Checkbox,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Dropdown = (props) => {
  const OptionsValue = props.Options.map((item) => item.value);
  const OptionsLabel = props.Options.map((item) => item.label);

  const [selectValue, setSelectValue] = useState(OptionsValue);
  const [selectLabel, setSelectLabel] = useState(OptionsLabel);

  console.log({ OptionsValue});

  const isAllSelected =
    props.Options.length > 0 && selectValue.length === props.Options.length;

  // console.log({selectValue});
  props.setOptions(selectValue);

  const handleValue = (e) => {
    props.fiterdata();
    const value = e.target.value;
    if (value.includes("all")) {
      setSelectValue(
        selectValue.length === props.Options.length ? [] : OptionsValue
      );
      setSelectLabel(
        selectValue.length === props.Options.length ? [] : OptionsLabel
      );
      return;
    }
    setSelectValue(value);
    setSelectLabel(
      value.map((OptionsValue) => {
        const option = props.Options.find(
          (item) => item.value === OptionsValue
        );
        return option ? option.label : "";
      })
    );
  };

  useEffect(() => {
    if (Array.isArray(selectLabel) && selectLabel.length > 0) {
      document.querySelector("#multi-select").innerHTML =
        selectLabel.join(", ");
    } else if (!Array.isArray(selectLabel)) {
      document.querySelector("#multi-select").innerHTML = selectLabel;
    } else {
      document.querySelector("#multi-select").innerHTML = "";
    }
  }, [selectLabel]);

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <Select
          value={selectValue}
          multiple
          id="multi-select"
          className=""
          onChange={handleValue}
          renderValue={(selected) => selected.join(", ")}
        >
          <MenuItem value="all">
            <ListItemIcon>
              <Checkbox checked={isAllSelected}></Checkbox>
            </ListItemIcon>
            <ListItemText primary="Select All"></ListItemText>
          </MenuItem>
          {props.Options.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              <ListItemIcon>
                <Checkbox
                  name="select-checkbox"
                  checked={selectValue.includes(option.value)}
                ></Checkbox>
              </ListItemIcon>
              <ListItemText primary={option.label}></ListItemText>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Dropdown;

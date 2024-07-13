// import {
//   Checkbox,
//   FormControl,
//   ListItemIcon,
//   ListItemText,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { useState } from "react";

// const Dropdown = (props) => {
//   const [selectValue, setSelectValue] = useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     props.setOptions(value);
//     setSelectValue(value);
//   };

//   return (
//     <>
//       <FormControl sx={{ width: "100px" }}>
//         <Select
//           value={selectValue}
//           multiple
//           // id="multi-select"
//           onChange={handleChange}
//         >
//           {props.Options.map((options) => (
//             <MenuItem key={options.id} value={options.value}>
//               <ListItemIcon>
//                 <Checkbox
//                   name="select-checkbox"
//                   checked={selectValue?.includes(options.value)}
//                 ></Checkbox>
//               </ListItemIcon>
//               <ListItemText primary={options.label}></ListItemText>
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </>
//   );
// };

// export default Dropdown;


import {
  Checkbox,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

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
        <Select
          multiple
          value={selectValue}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {props.Options.map((options) => (
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

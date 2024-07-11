// import { Checkbox, FormControl, ListItemIcon, ListItemText, MenuItem, Select } from '@mui/material';
// import React, { useEffect, useState } from 'react'

// const Options = [
//     {id:1 , value:"fire" , label:"fire"},
//     {id:2 , value:"fighting" , label:"fighting"},
//     {id:3 , value:"flying" , label:"flying"},
//     {id:4 , value:"poison" , label:"poison"},
//     {id:5 , value:"ground" , label:"ground"},
//     {id:6 , value:"rock" , label:"rock"},
//     {id:7 , value:"bug" , label:"bug"},
//     {id:8 , value:"grass" , label:"grass"},
//     {id:9 , value:"water" , label:"water"},
// ]

// const Dropdown = () => {
//   const OptionsValue = Options.map((item)=>item.value);
//   const OptionsLabel = Options.map((item)=>item.label);
//   const [selectValue,setSelectValue] = useState([]);
//   const [selectLabel,setSelectLabel] = useState([]);
//   console.log("selectValue",selectValue);
//   const isAllSelected = Options.length>0 && selectValue.length === Options.length
//   const handleValue = (e)=>{
//     const value = e.target.value;
//     if(value.includes("All")){
//       setSelectValue(
//         (selectValue && selectValue.length) === (Options && OptionsOptions.length)?[]:OptionsValue);
//         setSelectLabel(
//           (selectValue && selectValue.length) === (Options && OptionsOptions.length)?[]:OptionsLabel);
//         return;
//     }
//     setSelectValue(value);
//     setSelectLabel(value.map((OptionsValue)=>{
//       const option = Options.find((item)=>item.value===OptionsValue)
//       return option ? option.label:""
//     }))
//   };

//   useEffect(()=>{
//     if(Array.isArray(selectLabel) && selectLabel.length>0){
//       document.querySelector('#multi-select').innerHTML=selectLabel.join(" ,")
//     }else if(!Array.isArray(selectLabel)){
//       document.querySelector('#multi-select').innerHTML=selectLabel
//     }else{
//       document.querySelector('#multi-select').innerHTML="";
//     }
//   },[selectLabel])

//   return (
//     <>
//       <FormControl sx={{width:"20%"}}>
//         <Select value={selectValue}
//         multiple 
//         id='multi-select'
//         className=''
//         onChange={handleValue}
//         renderValue={(selected)=>{selected.join('')}}
//         >
//           <MenuItem value="all">
//         <ListItemIcon>
//                 <Checkbox checked={isAllSelected}></Checkbox>
//             </ListItemIcon>
//             <ListItemText primary="Select All"></ListItemText>
//         </MenuItem>
//         {Options.map((options)=>(
//             <MenuItem key={options.id} value={options.value}>
//             <ListItemIcon>
//                 <Checkbox name='select-checkbox' checked={selectValue.includes(options.value)}></Checkbox>
//             </ListItemIcon>
//             <ListItemText primary={options.label}></ListItemText>
//         </MenuItem>
//         ))}
//         </Select>
        
//       </FormControl>
//     </>
//   )
// }

// export default Dropdown;


import { Checkbox, FormControl, ListItemIcon, ListItemText, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Options = [
    {id: 1, value: "fire", label: "fire"},
    {id: 2, value: "fighting", label: "fighting"},
    {id: 3, value: "flying", label: "flying"},
    {id: 4, value: "poison", label: "poison"},
    {id: 5, value: "ground", label: "ground"},
    {id: 6, value: "rock", label: "rock"},
    {id: 7, value: "bug", label: "bug"},
    {id: 8, value: "grass", label: "grass"},
    {id: 9, value: "water", label: "water"},
];

const Dropdown = () => {
  const OptionsValue = Options.map((item) => item.value);
  const OptionsLabel = Options.map((item) => item.label);

  const [selectValue, setSelectValue] = useState(OptionsValue);
  const [selectLabel, setSelectLabel] = useState(OptionsLabel);

  const isAllSelected = Options.length > 0 && selectValue.length === Options.length;

  console.log({selectValue});

  const handleValue = (e) => {
    const value = e.target.value;
    if (value.includes("all")) {
      setSelectValue(
        selectValue.length === Options.length ? [] : OptionsValue
      );
      setSelectLabel(
        selectValue.length === Options.length ? [] : OptionsLabel
      );
      return;
    }
    setSelectValue(value);
    setSelectLabel(value.map((OptionsValue) => {
      const option = Options.find((item) => item.value === OptionsValue);
      return option ? option.label : "";
    }));
  };

  useEffect(() => {
    if (Array.isArray(selectLabel) && selectLabel.length > 0) {
      document.querySelector('#multi-select').innerHTML = selectLabel.join(", ");
    } else if (!Array.isArray(selectLabel)) {
      document.querySelector('#multi-select').innerHTML = selectLabel;
    } else {
      document.querySelector('#multi-select').innerHTML = "";
    }
  }, [selectLabel]);

  return (
    <>
      <FormControl sx={{ width: "20%" }}>
        <Select
          value={selectValue}
          multiple
          id='multi-select'
          className=''
          onChange={handleValue}
          renderValue={(selected) => selected.join(', ')}
        >
          <MenuItem value="all">
            <ListItemIcon>
              <Checkbox checked={isAllSelected}></Checkbox>
            </ListItemIcon>
            <ListItemText primary="Select All"></ListItemText>
          </MenuItem>
          {Options.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              <ListItemIcon>
                <Checkbox name='select-checkbox' checked={selectValue.includes(option.value)}></Checkbox>
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

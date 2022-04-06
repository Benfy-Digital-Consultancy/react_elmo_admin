import React from "react";
import "./style.scss";
import Select from "react-select";



export const MandateListDropdown = ({
  defaultValue,
  options,
  value,
  onChange,
  formatOptionLabel,
  className
}) => {




  const colourStyles = {
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "transparent" : null,
        color: "#fff",
        ":hover": {
          backgroundColor: "white",
          cursor: "pointer",
        },
      };
    },
    dropdownIndicator: (styles) => {
      return {
        ...styles,
        color: "#828282",
        height: 47,
        backgroundColor: "#f4f4f4",
        alignItems: "center",
      };
    },

    IndicatorSeparator: (styles) => {
      return {
        ...styles,

        fontSize: 30,
      };
    },

    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      zIndex: 9999,
    }),
    control: (base) => ({
      ...base,
      "&:hover": {
        cursor: "pointer",
      },
    }),
  };

  return (
    <Select
      name="madateSingleList"
      className={className}
      defaultValue={defaultValue}
      formatOptionLabel={formatOptionLabel}
      options={options}
      styles={colourStyles}
      value={value}
      onChange={onChange}
      isSearchable={false}
    />
  );
};

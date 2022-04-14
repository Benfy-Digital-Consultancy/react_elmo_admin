import React, { Component } from "react";
import Select, { components } from "react-select";
import dropDownIcon from "assets/images/Vector.png";
class NormalMultiSelect extends Component {
  //change select
  handleChange = (newValue) => {
    let { isMulti } = this.props;
    if (!!isMulti) {
      let body = {
        target: {
          name: this.props.name,
          value: [],
        },
      };
      if (!!newValue && newValue.length) {
        newValue.forEach((array) => {
          let obj = {
            value: array.value,
            label: array.label,
          };
          body.target.value.push(obj);
        });
      }
      this.props.handleChange(body);
    } else {
      let body = {
        target: {
          name: this.props.name,
          value: newValue ? newValue.value : "",
          label: newValue ? newValue.label : "",
        },
      };

      this.props.handleChange(body);
    }
  };

  //handle Input Change
  handleInputChange = (newValue) => {
    let body = {
      target: {
        name: this.props.name,
        value: newValue ? newValue : "",
      },
    };
    this.props.handleinputChange && this.props.handleinputChange(body);
  };

  render() {
    let {
      className = "select-form-control w-100",
      options = [],
      value = "",
      name = "",
      placeholder = "Select",
      disabled = false,
      isMulti = false,
      isClearable = false,
      isSearchable = false,
      showArrow = true,
    } = this.props;

    const DropdownIndicator = (props) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <span>
              <img src={dropDownIcon} style={{ width: "100%" }} />
            </span>
          </components.DropdownIndicator>
        )
      );
    };
    const customStyles = {
      placeholder: (base) => ({
        ...base,
        fontSize: 14,
        color: "#000",
        fontWeight: 500,
        lineHeight: 16,
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        height: "26px",
        width: "26px",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }),
      singleValue: (base) => ({
        ...base,
        color: "#000000",
        fontWeight: 600,
      }),
      control: (base) => ({
        ...base,
        borderRadius: 0,
        border: "0.25px solid #C0C0C0",
        outline: "0",
        background: "#F9F9F9",
        height: 42,
        paddingRight: 10,
      }),
    };
    return (
      <Select
        className={className}
        classNamePrefix="Select"
        isDisabled={disabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        options={options}
        onChange={this.handleChange}
        isMulti={isMulti}
        showArrow={showArrow}
        placeholder={placeholder}
        styles={customStyles}
        value={
          options.length > 0
            ? options.find((data) => data.value === value)
            : null
        }
        components={{ DropdownIndicator }}
      />
    );
  }
}

export default NormalMultiSelect;

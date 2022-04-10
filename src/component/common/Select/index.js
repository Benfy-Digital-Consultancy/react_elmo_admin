import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';

const { Option } = Select;
const SelectFilter = (props) => {

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div className='select_dropdown'>
            <Select defaultValue="One" style={{ width: 120 }} onChange={handleChange} >
                <Option value="One">{props.optionOne}</Option>
                <Option value="Two">{props.optionTwo}</Option>
                <Option value="Three">
                    {props.optionThree}
                </Option>
            </Select>
        </div>
    );
}

export default SelectFilter
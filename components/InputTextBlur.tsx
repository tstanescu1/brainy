import React from "react";
import { useState } from "react";

export default function InputTextBlur({subject, id, onBlur}) {
    const [value, setValue] = useState(subject);

    const onChange = e => {
        setValue(e.target.value);
    }

    return (
        <input 
        style={{ border: "0px", borderRadius: "3px", padding: "3px" }} 
        type="text"     
        value={value} 
        onChange={onChange}
        onBlur={() => onBlur(value, id)}
        />
    );
}
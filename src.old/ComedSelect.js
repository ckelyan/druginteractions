import React from 'react';
import Select from 'react-select'

export default function DoacSelect(props) {
    var style = {
        padding: 20,
    }

    const opts = Object.keys(props.options ? props.options : {})?.map((item) => {
        return {value: item, label: item}
    })

    return (
        <div style={style}>
            <h3 style={{marginTop: 0}}>Co-medications</h3>
            <Select
                isMulti
                value={props.selected}
                onChange={props.set}
                options={opts}
            />
        </div>
    )
}
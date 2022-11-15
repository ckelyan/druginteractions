import React from 'react';
import Select from 'react-select'

export default function DoacSelect(props) {
    var style = {
        padding: 20,
    }

    const opts = props.options?.map((item) => {
        return {value: item, label: item}
    })

    return (
        <div style={style}>
            <h3 style={{marginTop: 0}}>DOAC</h3>
            <Select
                value={props.selected}
                onChange={props.set}
                options={opts}
            />
        </div>
    )
}
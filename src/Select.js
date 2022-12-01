function SelectLabel({ label, onChange, selected }) {
    return (
        <li
            key={label}
            data-id={label}
            className="select-label"
            onClick={() => onChange(label)}
        >
            <input type='checkbox' onChange={() => onChange(label)} checked={selected}/>
            <label className="select-label-text">{label}</label>
        </li>
    )   
}

export default function Select({ selected, onChange, options, label }) {
    // console.log("opts", options);
    return (
        <div>
            <ul className="select">
                {options?.map(c => (<SelectLabel key={c} label={c} onChange={onChange} selected={selected.includes(c)}/>))}
            </ul>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Select from './Select';
import ResultPane from './ResultPane';
import axios from 'axios'

export default function ContentWrapper() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doac, setDoac] = useState('');
    const [comed, setComed] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const result = await axios('/data.json');
            setItems(result.data)
            setLoading(false);
        };

        getItems();
    }, []);

    const getSelector = (f, isMulti=false) => {
        return isMulti ? 
            (id) => { f(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]) }
            : (id) => { f(() => new Array(id)) }
    }

    var doacOptions = [];
    if (doac !== '' && items) {
        doacOptions = Object.keys(items[doac]);
    }

    return (
        <div className="content">
            <Loader visibility={loading}/>
            <div className="content-grid">
                <div className="left-pane">
                    <div id="doac-select">
                        <Select selected={doac} onChange={getSelector(doac => {setDoac(doac); setComed([]);})} options={items?._DOAC}/>
                    </div>
                    <div id="comed-select">
                        <Select selected={comed} onChange={getSelector(setComed, true)} options={doacOptions}/>
                    </div>
                </div>
                <div className="right-pane">
                    <ResultPane data = {items} doac={doac} comed={comed} />
                </div>
            </div>
        </div>
    )
}
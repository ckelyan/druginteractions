import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import DoacSelect from './DoacSelect';
import ComedSelect from './ComedSelect';
import ResultPane from './ResultPane';
import axios from 'axios'

export default function ContentWrapper() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getItems = async () => {
            const result = await axios('/data.json');
            setItems(result.data)
            setLoading(false);
        };

        getItems();
    }, []);

    var containerStyle = {
        
    }
    
    var innerStyle = {
        width: "80vw",
        height: "80vh",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
    }

    var leftPaneStyle = {
        width: "33%",
        height: "100%",
        float: "left",
    }

    var rightPaneStyle = {
        width: "66%",
        float: "left",
        height: "100%",
        borderLeft: 0,
    }

    var selectStyle = {
        height: "50%",
        textAlign: "center",
        
    }

    const [doac, setDoac] = useState('');
    const [comed, setComed] = useState([]);

    return (
        <div style={containerStyle}>
            <Loader visibility={loading}/>
            <div style={innerStyle} className="container">
                <div style={leftPaneStyle} className="container left-pane">
                    <div style={selectStyle} className="top-left-pane">
                        <DoacSelect selected={doac} set={doac => {setDoac(doac); setComed([]);}} options={items._DOAC}/>
                    </div>
                    <div style={selectStyle} className="container bot-left-pane">
                        <ComedSelect selected={comed} set={setComed} options={items[doac.value]}/>
                    </div>
                </div>
                <div style={rightPaneStyle} className="container right-pane">
                    <ResultPane data={items} doac={doac} comed={comed}/>
                </div>
            </div>
        </div>
    )
}
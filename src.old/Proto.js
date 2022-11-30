import React, { Component } from 'react';
import rawdata from './exampledata.csv';
import fetch from 'sync-fetch';
import Select from 'react-select';

function toDataTree(table) {
    var tree = {};
    table = [...table];
    table.shift();
    
    table.forEach(row => {
        var [a, b, c] = row;
        try {
            tree[a][b] = c
        } catch (e) {
            tree[a] = {[b]: c}
        }
    })

    return tree;
}

function fetchData() {
    var rawDataTable = [];
    var dataTable = [[],[],[]];
    var optionsDataTable = [new Set(), new Set(), new Set()];

    const lines = fetch(rawdata).text().split('\n');
    
    lines.forEach(line => {
        line = line.split(',');
        rawDataTable.push(line);

        for (var i = 0; i < 3; i++) {
            dataTable[i].push(line[i]);
            optionsDataTable[i].add(line[i])
        };
    })

    var dataTree = toDataTree(rawDataTable);

    return [dataTable, dataTree, optionsDataTable]
}

class ContentWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {selected1: [], selected2: []};
    }

    getSelected1() { return this.state.selected1; }
    handleChange1 = selected1 => { this.setState({ selected1 }); }
    getSelected2() { return this.state.selected2; }
    handleChange2 = selected2 => { this.setState({ selected2 }); }

    render() {
        var data = [[], []];

        for (var i = 0; i < 2; i++) {
            [...this.props.data[i]].slice(1).forEach(v => {
                data[i].push({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) })
            })
        };

        const [selected1, selected2] = [this.getSelected1.bind(this), this.getSelected2.bind(this)]

        const style = {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #000",
            width: "70%",
            height: "70%",
        }

        const drugSelStyle = {
            width: "30%",
            height: "100%",
            float: "left",
            borderRight: "1px solid #000",
        }

        const upperDrugSelStyle = {
            padding: 20,
            height: "50%",
            borderBottom: "1px solid #000",
        }

        const lowerDrugSelStyle = {
            padding: 20,
            height: "50%",
        }

        const interactionStyle = {
            height: "100%",
            // padding: 10,
            overflow: "hidden",
            border: "1px solid #000"
        }

        return (
            <div style={style}>
                <div style={drugSelStyle}>
                    <div style={upperDrugSelStyle}>
                        <h3>Drug A</h3>
                        <DrugColumn
                            data={data[0]}
                            handleChange={this.handleChange1}
                            getSelected={selected1}
                        />
                    </div>
                    <div style={lowerDrugSelStyle}>
                        <h3>Drug B</h3>
                        <DrugColumn
                            data={data[1]}
                            handleChange={this.handleChange2}
                            getSelected={selected2}
                        />
                    </div>
                </div>
                <div style={interactionStyle}>
                    <h3>Interactions </h3>
                    <InteractionResults
                        data={data[2]}
                        tree={this.props.tree}
                        getSelected1={selected1}
                        getSelected2={selected2}
                    />
                </div>
            </div>
        )
    }
}

class DrugColumn extends Component {
    render() {
        const style = {
            height: "50%",
        }

        return (
            <div style={style}>
                <Select
                    value={this.props.getSelected()}
                    onChange={this.props.handleChange}
                    options={this.props.data}
                />
            </div>
        )
    }
}

class InteractionCard extends Component {
    render() {
        const styleCard = {
            width: 250,
            minHeight: 170,
            textAlign: "center",
            border: "1px solid #000",
            padding: 10,
            margin: 10
        };

        const styleTitle = {
            fontSize: 30,
        }

        var {druga, drugb, desc} = this.props.info

        return (
            <div style={styleCard}>
                <h1 style={styleTitle}>{druga}, {drugb}</h1>
                <p>{desc}</p>
            </div>
        )
    }
}

class InteractionResults extends Component {
    render() {
        var node, desc, info;
        var interactionCards = [];
        const [selected1, selected2] = [this.props.getSelected1(), this.props.getSelected2()];
        
        selected1.forEach(el1 => {
            selected2.forEach(el2 => {
                node = this.props.tree[el1.value];
                if (el2.value in node) {
                    desc = this.props.tree[el1.value][el2.value]
                    info = {druga: el1.label, drugb: el2.label, desc: desc}
                    interactionCards.push(<InteractionCard key={info.druga + info.drugb} info={info}/>)
                }
            });
        });

        return (
            <div>
                {interactionCards}
            </div>
        )
    }
}

class Proto extends Component {
    render() {
        const [, dataTree, optionsDataTable] = fetchData();
    
        return (
            <div>
                <ContentWrapper data={optionsDataTable} tree={dataTree}/>
            </div>
        )
    }
}

export default Proto;
import InteractionResults from "./InteractionResults";
import { colorMap } from "./Const";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function ResultPane(props) {
    const data = (c) => props.data[props.doac][c]

    const results = props.comed.map(c => {
        return (
            <TabPanel key={c}>
                <InteractionResults data={data(c)}/>
            </TabPanel>
        )
    });

    const tabs = props.comed.map(c => {
        return <Tab key={c}>
            <div className="tab-label">
                <span className="tab-label__icon">
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="5" stroke="gray" strokeWidth="1" fill={colorMap[data(c)[2]]} />
                    </svg>
                </span>
                <span className="tab-label__text">{c}</span> 
            </div>
        </Tab>
    });

    return (
        <div id="result-pane">
            <h1 style={{margin: 0, padding: 15}}>Interaction Results</h1>

            {tabs.length ? <Tabs>
                <TabList>
                    {tabs}
                </TabList>

                {results}
            </Tabs> : <hr />}
        </div>
    )
}
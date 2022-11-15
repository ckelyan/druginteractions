import InteractionResults from "./InteractionResults";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function ResultPane(props) {
    const results = props.comed.map(c => (
        <TabPanel key={c}>
            <InteractionResults data={props.data[props.doac.value][c.value]}/>
        </TabPanel>
    ));

    const tabs = props.comed.map(c => {
        return <Tab key={c.value}>{c.value}</Tab>
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
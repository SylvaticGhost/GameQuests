import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MyQuests from '../../components/MyQuests.jsx';
import {QuestBox} from "../../components/QuestBox.jsx";

const n = 9;
const columns = 3;

function TabsPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabsPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Main() {
    const [value, setValue] = React.useState(0);
    const quests = [
        { id: 1, title: "BanterBrush", questions: 10, people: 2 },
        { id: 2, title: "CreativeSpace", questions: 15, people: 5 },
        { id: 3, title: "ArtHub", questions: 20, people: 3 },
        { id: 4, title: "BanterBrush", questions: 10, people: 2 },
        { id: 7, title: "CreativeSpace", questions: 15, people: 5 },
        { id: 9, title: "ArtHub", questions: 20, people: 3 },
    ];
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="EXPLORE" {...a11yProps(0)} />
                    <Tab label="My quests" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabsPanel value={value} index={0}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 2,
                        mt: 4,
                    }}
                >
                    {quests.map((quest) => (
                        <QuestBox
                            key={quest.id}
                            id={quest.id}
                            title={quest.title}
                            questions={quest.questions}
                            people={quest.people}
                        />
                    ))}
                </Box>
            </TabsPanel>
            <TabsPanel value={value} index={1}>
                <p>Ok</p>
                <MyQuests />
            </TabsPanel>
        </Box>
    );
}

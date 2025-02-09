import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function Header(props) {
    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };
    return <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={props.value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="EXPLORE" {...a11yProps(0)} />
            <Tab label="My quests" {...a11yProps(1)} />
            {/*<Tab label="Profile" {...a11yProps(2)} />*/}
        </Tabs>
    </Box>
}

export default Header;

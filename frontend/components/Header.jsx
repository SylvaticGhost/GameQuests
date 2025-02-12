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

    const handleChange = (_, newValue) => props.setValue(newValue);

    return <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={props.value} onChange={handleChange}>
            <Tab label="EXPLORE" />
            <Tab label="My quests" />
            <Tab label="Create quest" />
        </Tabs>
    </Box>
}

export default Header;

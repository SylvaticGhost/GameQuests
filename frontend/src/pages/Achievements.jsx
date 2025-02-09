import React, {useState} from 'react'
import Header from "../../components/Header.jsx";
import {Box} from "@mui/material";

function Achievements() {
    const [value, setValue] = useState(0);

    return <Box sx={{width: "100%"}}>
        <Header value={value} setValue={setValue} />
    </Box>
}

export default Achievements;

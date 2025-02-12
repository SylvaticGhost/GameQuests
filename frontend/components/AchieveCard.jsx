import React, {useState} from 'react'
import {Box, Typography} from "@mui/material";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function unlockDate(){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function AchieveCard(props) {
    /*const [isUnlocked, setUnlock] = useState(false);
    function handleUnlocked() {
        setUnlock(!isUnlocked);
    }*/
    let isUnlocked = props.state

    return <Box
    sx={{
            display: "flex",
            padding: "9px 24px 24px 24px",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            /*width: "fit-content",*/
            height: "30%",
            width: "25%",

            borderRadius: "6px",
            border: "1px solid #8EB8E1"
    }}>
        {isUnlocked ? <Box sx={{
            size: "180px",
            aspectRatio: "1/1",
            borderRadius: "4px",
            background: "#D9D9D9"
        }}/> :
            <QuestionMarkIcon sx={{ width: 180, height: 180, color: "rgba(0, 0, 0, 0.54)"}}/>
        }
        <Box>
            {isUnlocked ?
                <Typography variant="h5" fontWeight="bold">{props.title}</Typography> :
                <Typography variant="h5" fontWeight="bold">Secret Yet To Uncover</Typography>
            }
            {isUnlocked && <Typography variant="body2" sx={{color: "rgba(0, 0, 0, 0.54)"}}>
                {unlockDate()/*props.date*/}
            </Typography>}
        </Box>
        <Typography variant="body2">
            {props.desc}
        </Typography>
    </Box>
}

export default AchieveCard;

import React, {useState} from 'react'
import {Box, Typography} from "@mui/material";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
            border: "1px solid rgba(255, 255, 255, 0.65)",
            backgroundColor: "rgba(40, 41, 48, 1)",
            '&:hover': {
                boxShadow: "2px 0px 6px 0px var(--teal, #6EDCD9), -2px 0px 6px 0px var(--teal, #6EDCD9), 0px -2px 6px 0px var(--teal, #6EDCD9), 0px 2px 6px 0px var(--teal, #6EDCD9)",
            }
    }}>
        {isUnlocked ? <EmojiEventsIcon
                sx={{ width: 180, height: 180, color: "rgba(110, 220, 217, 1)"}}/> :
            <QuestionMarkIcon
                sx={{ width: 180, height: 180, color: "rgba(110, 220, 217, 1)"}}/>
        }
        <Box>
            {isUnlocked ?
                <Typography variant="h5" fontWeight="bold">{props.title}</Typography> :
                <Typography variant="h5" fontWeight="bold">Secret Yet To Uncover</Typography>
            }
            {isUnlocked && <Typography variant="body2" sx={{color: "rgba(255, 255, 255, 0.65)"}}>
                {unlockDate()/*props.date*/}
            </Typography>}
        </Box>
        <Typography variant="body2">
            {props.desc}
        </Typography>
    </Box>
}

export default AchieveCard;

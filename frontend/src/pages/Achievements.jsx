import React, {useState} from 'react'
import Header from "../../components/Header.jsx";
import {Box, Typography} from "@mui/material";
import achievements from "../../arrays/achievement.js"
import quests from "../../arrays/quests.js";
import AchieveCard from "../../components/AchieveCard.jsx";

function Achievements() {
    const [value, setValue] = useState(0);

    return <Box sx={{width: "100%"}}>
        <Header value={value} setValue={setValue} />
        <Box
        sx={{
            display: "flex",
            padding: "24px 126px",
            flexDirection: "column",
            alignItems: "center",
            gap: 3
        }}>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                alignSelf: "stretch"
            }}>
                <Typography variant="h3" fontWeight="bold">Achievements</Typography>
                <Typography variant="h5">Here are all the achievements you’ve earned. Great job!</Typography>
            </Box>
            <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                alignContent: "flex-start",
                gap: "24px 36px",
                alignSelf: "stretch",
                flexWrap: "wrap"
            }}>
                {achievements.map((achieve) => (
                <AchieveCard
                    key={achieve.id}
                    id={achieve.id}
                    title={achieve.title}
                    desc={achieve.desc}
                    state={achieve.state}
                />
                ))}
            </Box>
        </Box>
    </Box>
}

export default Achievements;

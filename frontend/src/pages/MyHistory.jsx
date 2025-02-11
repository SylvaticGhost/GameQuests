import React, {useState} from 'react'
import {Box, Typography, Button} from "@mui/material";
import SearchQuest from "../../components/SearchQuest.jsx";
import {QuestBox} from "../../components/QuestBox.jsx";
import Header from "../../components/Header.jsx";
import TabsPanel from "../../components/TabsPanel.jsx";
import quests from "../../arrays/quests.js";


function MyHistory(){
    const [value, setValue] = useState(0);

    return <Box sx={{ width: '100%' }}>
        <Header value={value} setValue={setValue} />
        <Box
        sx={{
            display: "flex",
            padding: "24px 126px",
            flexDirection: "column",
            gap: 4
        }}>
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignSelf: "stretch"
        }}>
            <Typography variant="h3" fontWeight="bold">History</Typography>
            <Typography variant="h5">Here are all the quests you’ve come across.</Typography>
        </Box>
        <SearchQuest />
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1
            }}>
            <Typography variant="h4">In Progress</Typography>
        <TabsPanel value={value} index={0}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 2,
                    mt: 4,
                }}
            >
                {quests.slice(0, 3).map((quest) => (
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
            <Button variant="outlined" style={{textTransform: 'none'}}>Load more</Button>
        </Box>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1
            }}>
            <Typography variant="h4">Completed quests</Typography>
            <TabsPanel value={value} index={0}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 2,
                        mt: 4,
                    }}
                >
                    {quests.slice(0, 3).map((quest) => (
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
            <Button variant="outlined" style={{textTransform: 'none'}}>Load more</Button>
        </Box>
    </Box>
    </Box>
}

export default MyHistory;

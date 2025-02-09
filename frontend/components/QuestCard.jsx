import React from 'react';
import {Box, Divider, Rating, Typography} from "@mui/material";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ChecklistIcon from '@mui/icons-material/Checklist';

// bro is a column :(
function QuestCard(props) {
    return <Box
    ex={{
        display: "flex",
        width: "360px",
        flexDirection: "column",
        alignItems: "flex-start",

        borderRadius: "4px",
        border: "1px solid rgba(0, 0, 0, 0.54)"
    }}>
        <Box ex={{height: "95px", alignSelf: "stretch"}}></Box>
        <Box
            ex={{
                display: "flex",
                padding: "3px 12px 16px 9px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
                alignSelf: "stretch"
            }}
        >
            <Typography variant="h5">Title{/*props.title*/}</Typography>
            <Box
                ex={{
                    display: "flex",
                    padding: "0px 2px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 2}}
            >
                <Box
                    ex={{
                        display: "flex",
                        padding: "0px 2px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 2
                }}
                >
                    <Typography variant="body1" sx={{color: "rgba(0, 0, 0, 0.54)"}}>
                        Author{/*props.author*/}
                    </Typography>
                    <Box
                        ex={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2
                    }}
                    >
                        <Box
                            ex={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 1
                            }}
                        >
                            <ChecklistIcon />
                            <Typography variant="body1" sx={{color: "rgba(0, 0, 0, 0.54);"}}>
                                10{/*props.quantity*/} tasks
                            </Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem/>
                        <Box
                            ex={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 1
                            }}
                        >
                            <QueryBuilderIcon />
                             <Typography variant="body1" sx={{color: "rgba(0, 0, 0, 0.54);"}}>
                                3 min{/*props.time*/}
                             </Typography>
                        </Box>
                    </Box>
                </Box>
                <Rating defaultValue={3} />
            </Box>
        </Box>
    </Box>
}

export default QuestCard;

import {Box, Button, Typography} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {useNavigate} from "react-router-dom";
export function QuestBox({ title, questions, people, id }) {
    const navigate = useNavigate();
    const handleCompleteClick = () => {
        navigate(`/quest?id=${id}`);
    };
    return (
        <Box
            sx={{
                width: 400,
                height: 250,
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
                border: "2px solid #6EDCD9",
                color: "#fff",
                transition: "0.3s",
        "&:hover": {
          boxShadow: "0px 0px 25px #6EDCD9",
        },
            }}
        >
            <Box
                sx={{
                    height: "60%",
                    backgroundImage: "url(https://via.placeholder.com/400x150)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
            <AssignmentIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">{people} Tasks</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon sx={{ mr: 0.5 }} />
            <Typography variant="body2">{questions} mins</Typography>
          </Box>
                    <Button variant="contained" size="small" onClick={handleCompleteClick}>
                        View quest
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}


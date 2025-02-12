import React, { useState, useRef } from "react";
import axios from "axios";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    Tabs,
    Tab,
} from "@mui/material";
import PaginationComponent from "../../components/PaginationComponent";
import TestQuestion from "../../components/TestQuestion";
import TextFieldQuestion from "../../components/TextFieldQuestion";
import PhotoSearchQuestion from "../../components/PhotoSearchQuestion";

const CreateQuestPage = () => {
    const [questName, setQuestName] = useState("");
    const [description, setDescription] = useState("");
    const [timeLimit, setTimeLimit] = useState(20);
    const [questions, setQuestions] = useState([
        { type: "test", question: "", answers: ["", ""], correctIndex: 0 },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coverImage, setCoverImage] = useState(null);
    const inputRef = useRef(null);

    const handleQuestionTypeChange = (index, type) => {
        setQuestions((prev) => {
            const newQuestions = [...prev];
            newQuestions[index] = { type, question: "", answers: ["", ""], correctIndex: 0 };
            return newQuestions;
        });
    };

    const handleQuestionChange = (index, value) => {
        setQuestions((prev) => {
            const newQuestions = [...prev];
            newQuestions[index].question = value;
            return newQuestions;
        });
    };

    const handleAddQuestion = () => {
        setQuestions((prev) => [...prev, { type: "test", question: "", answers: ["", ""], correctIndex: 0 }]);
        setCurrentPage((prev) => prev + 1);
    };

    const handleDeleteQuestion = (index) => {
        setQuestions((prev) => {
            if (prev.length > 1) {
                const newQuestions = [...prev];
                newQuestions.splice(index, 1);
                return newQuestions;
            }
            return prev;
        });
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!questName.trim()) {
            alert("Quest name is required");
            return;
        }

        const hasCorrectAnswer = questions.every((q) =>
            q.type === "test" ? q.answers.some((_, index) => q.correctIndex === index) : true
        );

        if (!hasCorrectAnswer) {
            alert("Each test question must have at least one correct answer.");
            return;
        }

        const questData = {
            title: questName,
            description,
            timeLimit,
            questions,
            coverImage,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:4000/quest", questData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Quest created successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Failed to create quest:", error.response?.data || error.message);
            alert("Failed to create quest. Please try again.");
        }
    };

    return (
        <Box sx={{ p: 2, bgcolor: "background.paper", minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom>
                Create Quest
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 2 }}>
                        {coverImage ? (
                            <Box
                                component="img"
                                src={coverImage}
                                alt="Cover"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: 2,
                                    boxShadow: "0px 0px 15px #6EDCD9",
                                }}
                            />
                        ) : (
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{ width: "100%", height: 200, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, boxShadow: "0px 0px 15px #6EDCD9" }}
                            >
                                Upload Cover Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleCoverImageChange}
                                />
                            </Button>
                        )}
                    </Box>
                    <TextField
                        fullWidth
                        label="Quest Name"
                        value={questName}
                        onChange={(e) => setQuestName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Time Limit"
                        type="number"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(Number(e.target.value))}
                        sx={{ mb: 2 }}
                    />
                     <Button variant="outlined" onClick={handleAddQuestion} sx={{ mt: 2 }}>
                        Add Question
                    </Button>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Tabs
                        value={questions[currentPage - 1]?.type || "test"}
                        onChange={(e, value) => handleQuestionTypeChange(currentPage - 1, value)}
                        sx={{ mb: 4 }}
                    >
                        <Tab label="Test" value="test" />
                        <Tab label="Text Field" value="text" />
                        <Tab label="Photo Search" value="photo" />
                    </Tabs>

                    {questions[currentPage - 1]?.type === "test" && (
                        <TestQuestion
                            question={questions[currentPage - 1]?.question}
                            answers={questions[currentPage - 1]?.answers}
                            correctIndex={questions[currentPage - 1]?.correctIndex}
                            onQuestionChange={(value) => handleQuestionChange(currentPage - 1, value)}
                        />
                    )}

                    <Button color="error" onClick={() => handleDeleteQuestion(currentPage - 1)} sx={{ mt: 2 }}>
                        Delete Question
                    </Button>

                    <PaginationComponent count={questions.length} page={currentPage} onChange={setCurrentPage} />
                </Grid>
            </Grid>

            <Button variant="contained" sx={{ mt: 4 }} onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};

export default CreateQuestPage;

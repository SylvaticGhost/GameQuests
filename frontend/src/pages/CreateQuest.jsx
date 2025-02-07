import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Pagination,
  Tab,
  Tabs,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

const CreateQuest = () => {
  const [questName, setQuestName] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(20);
  const [questionType, setQuestionType] = useState("single");
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", "", "", ""], correctIndex: 0 },
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const newQuestions = Array.from({ length: questionCount }, (_, i) =>
      questions[i] || { question: "", answers: ["", "", "", ""], correctIndex: 0 }
    );
    setQuestions(newQuestions);
    if (currentPage > questionCount) {
      setCurrentPage(questionCount);
    }
  }, [questionCount]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctIndex = parseInt(value);
    setQuestions(newQuestions);
  };

  const handleDeleteAnswer = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.splice(aIndex, 1);
    setQuestions(newQuestions);
  };

  const filledQuestionsCount = questions.filter(
    (q) => q.question.trim() !== "" && q.answers.filter((a) => a.trim() !== "").length >= 2
  ).length;

  const handleSubmit = () => {
    console.log({ questName, description, timeLimit, questionCount, questions });
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "#000",
        color: "#0f0",
        minHeight: "100vh",
        "& .MuiTextField-root": {
          bgcolor: "#222",
          color: "#0f0",
          borderRadius: 1,
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create Quest
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side Inputs */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Quest Name"
            value={questName}
            onChange={(e) => setQuestName(e.target.value)}
            sx={{ mb: 2, input: { color: "#0f0" } }}
          />
          <TextField
            fullWidth
            multiline
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2, textarea: { color: "#0f0" } }}
          />
          <TextField
            fullWidth
            label="Time Limit (minutes)"
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            sx={{ mb: 2, input: { color: "#0f0" } }}
          />
          <TextField
            fullWidth
            label="Number of Questions"
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            sx={{ mb: 2, input: { color: "#0f0" } }}
          />
          <Typography variant="body1" sx={{ mt: 4 }}>
            edit your quest there. you have {questionCount - filledQuestionsCount} questions to fill
          </Typography>
        </Grid>

        {/* Right Side Tabs and Question Editor */}
        <Grid item xs={12} md={6}>
          <Tabs
            value={questionType}
            onChange={(e, value) => setQuestionType(value)}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ mb: 4 }}
          >
            <Tab label="Single Correct" value="single" sx={{ color: questionType === "single" ? "#0f0" : "#fff" }} />
            <Tab label="Multiple Correct" value="multiple" sx={{ color: questionType === "multiple" ? "#0f0" : "#fff" }} />
            <Tab label="Photo Search" value="photo" sx={{ color: questionType === "photo" ? "#0f0" : "#fff" }} />
          </Tabs>

          {questions.length > 0 && (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  label="Question"
                  value={questions[currentPage - 1].question}
                  onChange={(e) =>
                    handleQuestionChange(currentPage - 1, e.target.value)
                  }
                  sx={{ flex: 1, mr: 1, input: { color: "#0f0" } }}
                />
                <IconButton color="inherit">
                  <Edit sx={{ color: "#0f0" }} />
                </IconButton>
              </Box>

              {questions[currentPage - 1].answers.map((answer, aIndex) => (
                <Box key={aIndex} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <RadioGroup
                    row
                    value={questions[currentPage - 1].correctIndex.toString()}
                    onChange={(e) =>
                      handleCorrectAnswerChange(currentPage - 1, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value={aIndex.toString()}
                      control={<Radio sx={{ color: "#0f0" }} />}
                      label=""
                    />
                  </RadioGroup>
                  <TextField
                    fullWidth
                    label={`Answer ${aIndex + 1}`}
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(currentPage - 1, aIndex, e.target.value)
                    }
                    sx={{ input: { color: "#0f0" } }}
                  />
                  <IconButton
                    color="inherit"
                    onClick={() => handleDeleteAnswer(currentPage - 1, aIndex)}
                  >
                    <Delete sx={{ color: "#f00" }} />
                  </IconButton>
                </Box>
              ))}

              <Button
                variant="outlined"
                startIcon={<Add sx={{ color: "#0f0" }} />}
                onClick={() =>
                  handleAnswerChange(currentPage - 1, questions[currentPage - 1].answers.length, "")
                }
                sx={{ mb: 2, color: "#0f0", borderColor: "#0f0" }}
              >
                Add Answer
              </Button>
            </Box>
          )}

          {/* Pagination */}
          <Pagination
            count={questions.length}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            sx={{ mt: 2, mb: 4, button: { color: "#0f0" } }}
          />
        </Grid>
      </Grid>

      {/* Submit button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 4, bgcolor: "#0f0", color: "#000" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateQuest;




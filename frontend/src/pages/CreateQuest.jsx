import React, { useState, useEffect, useRef } from "react";
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
    { question: "", answers: ["", ""], correctIndex: 0 },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef(null);

  useEffect(() => {
    const newQuestions = Array.from({ length: questionCount }, (_, i) =>
      questions[i] || { question: "", answers: ["", ""], correctIndex: 0 }
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
    if (newQuestions[qIndex].answers.length > 2) {
      newQuestions[qIndex].answers.splice(aIndex, 1);
      setQuestions(newQuestions);
    } else {
      alert("Each question must have at least 2 answers.");
    }
  };

const handleAddQuestion = () => {
  if (questionCount < 1) {
    alert("You must have at least 1 question in your quest.");
  } else {
    setQuestionCount(questionCount + 1);
  }
}

const handleAddAnswer = (qIndex) => {
  const newQuestions = [...questions];
  if (newQuestions[qIndex].answers.length < 10) {
    newQuestions[qIndex].answers.push("");
    setQuestions(newQuestions);
  } else {
    alert("Each question can have a maximum of 10 answers.");
  }
};

  const filledQuestionsCount = questions.filter(
    (q) => q.question.trim() !== "" && q.answers.filter((a) => a.trim() !== "").length >= 2
  ).length;

  const handleSubmit = () => {
    const hasCorrectAnswer = questions.every(
      (q) => q.answers[q.correctIndex].trim() !== ""
    );

    if (!hasCorrectAnswer) {
      alert("Each question must have at least one correct answer.");
      return;
    }
    console.log({ questName, description, timeLimit, questionCount, questions });
  };

  const handleIconClick = () => {
    inputRef.current.focus();
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "#fff",
        color: "#000",
        minHeight: "100vh",
        "& .MuiTextField-root": {
          bgcolor: "#f0f0f0",
          color: "#000",
          borderRadius: 4,
        },
        "& .MuiInputLabel-root": {
          borderRadius: 4,
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create Quest
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side Inputs */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            multiline
            label="Quest Name"
            value={questName}
            onChange={(e) => setQuestName(e.target.value)}
            sx={{ mb: 2, input: { color: "#000" } }}
           slotProps={{
            input: {
              sx: {
                borderRadius: 4,
              },
            },
            inputLabel: {
              sx: {
                borderRadius: 4,
              },
            },
           }}
          />
          <TextField
            fullWidth
            multiline
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2, textarea: { color: "#000" } }}
            slotProps={{
              input: {
                sx: {
                  borderRadius: 4,
                },
              },
              inputLabel: {
                sx: {
                  borderRadius: 4,
                },
              },
             }}
          />
          <TextField
            fullWidth
            label="Time Limit (minutes)"
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            sx={{ mb: 2, input: { color: "#000" } }}
            slotProps={{
              input: {
                sx: {
                  borderRadius: 4,
                },
              },
              inputLabel: {
                sx: {
                  borderRadius: 4,
                },
              },
             }}
          />
          <TextField
            fullWidth
            label="Number of Questions"
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Math.max(1, Number(e.target.value)))}
            sx={{ mb: 2, input: { color: "#000" } }}
            slotProps={{
              input: {
                sx: {
                  borderRadius: 4,
                },
              },
              inputLabel: {
                sx: {
                  borderRadius: 4,
                },
              },
             }}
          />
          <Typography variant="body1" sx={{ mt: 4 }}>
            edit your quest there. you have {questionCount - filledQuestionsCount} questions to fill
          </Typography>
          <Button
            variant="outlined"
            onClick={handleAddQuestion}
            sx={{ mt: 2, color: "#000", borderColor: "#000" }}
          >
            Add Question
          </Button>
        </Grid>

        {/* Right Side Tabs and Question Editor */}
        <Grid item xs={12} md={8}>
          <Tabs
            value={questionType}
            onChange={(e, value) => setQuestionType(value)}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ mb: 4 }}
          >
            <Tab label="Single Correct" value="single" sx={{ color: questionType === "single" ? "#000" : "#888" }} />
            <Tab label="Multiple Correct" value="multiple" sx={{ color: questionType === "multiple" ? "#000" : "#888" }} />
            <Tab label="Text field" value="text" sx={{ color: questionType === "input" ? "#000" : "#888" }} />
            <Tab label="Photo Search" value="photo" sx={{ color: questionType === "photo" ? "#000" : "#888" }} />
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
                  sx={{ flex: 1, mr: 1, input: { color: "#000" } }}
                  inputRef={inputRef}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: 4,
                      },
                    },
                    inputLabel: {
                      sx: {
                        borderRadius: 4,
                      },
                    },
                   }}
                />
                <IconButton color="inherit" onClick={handleIconClick}>
                  <Edit sx={{ color: "#000" }} />
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
                      control={<Radio sx={{ color: "#000" }} />}
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
                    sx={{ input: { color: "#000" } }}
                    slotProps={{
                      input: {
                        sx: {
                          borderRadius: 4,
                        },
                      },
                      inputLabel: {
                        sx: {
                          borderRadius: 4,
                        },
                      },
                     }}
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
                startIcon={<Add sx={{ color: "#000" }} />}
                onClick={() => handleAddAnswer(currentPage - 1)}
                sx={{ mb: 2, color: "#000", borderColor: "#000" }}
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
            sx={{ mt: 2, mb: 4, button: { color: "#000" } }}
          />
        </Grid>
      </Grid>

      {/* Submit button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 4, bgcolor: "#000", color: "#fff" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateQuest;




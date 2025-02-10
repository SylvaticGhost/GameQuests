import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
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
  const inputRef = useRef(null);

  const handleQuestionTypeChange = (index, type) => {
    const newQuestions = [...questions];
    newQuestions[index] = { type, question: "", answers: ["", ""], correctAnswers: [] };
    setQuestions(newQuestions);
  };

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
    newQuestions[qIndex].correctIndex = value;
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (qIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].answers.length < 10) {
      newQuestions[qIndex].answers.push("");
      setQuestions(newQuestions);
    } else {
      alert("Each question can have a maximum of 10 answers.");
    }
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
    setQuestions([...questions, { type: "test", question: "", answers: ["", ""], correctIndex: 0 }]);
    setCurrentPage(questions.length + 1);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    if (newQuestions.length > 1) {
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
      setCurrentPage(Math.max(1, currentPage - 1));
    } else {
      alert("You must have at least 1 question in your quest.");
    }
  };

  const handleSubmit = () => {
    const hasCorrectAnswer = questions.every((q) =>
      q.type === "test"
        ? q.answers.some((_, index) => q.correctAnswers.includes(index))
        : true
    );

    if (!hasCorrectAnswer) {
      alert("Each question must have at least one correct answer.");
      return;
    }

    console.log({ questName, description, timeLimit, questions });
  };

  const currentQuestion = questions[currentPage - 1];

  return (
    <Box sx={{ p: 2, bgcolor: "#fff", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Create Quest
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
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
          <Button
            variant="outlined"
            onClick={handleAddQuestion}
            sx={{ mt: 2 }}
          >
            Add Question
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <Tabs
            value={currentQuestion.type}
            onChange={(e, value) => handleQuestionTypeChange(currentPage - 1, value)}
            sx={{ mb: 4 }}
          >
            <Tab label="Test" value="test" />
            <Tab label="Text Field" value="text" />
            <Tab label="Photo Search" value="photo" />
          </Tabs>

          {currentQuestion.type === "test" && (
            <TestQuestion
              question={currentQuestion.question}
              answers={currentQuestion.answers}
              correctIndex={currentQuestion.correctIndex}
              onQuestionChange={(value) => handleQuestionChange(currentPage - 1, value)}
              onAnswerChange={(aIndex, value) => handleAnswerChange(currentPage - 1, aIndex, value)}
              onCorrectAnswerChange={(value) => handleCorrectAnswerChange(currentPage - 1, value)}
              onAddAnswer={() => handleAddAnswer(currentPage - 1)}
              onDeleteAnswer={(aIndex) => handleDeleteAnswer(currentPage - 1, aIndex)}
              inputRef={inputRef}
            />
          )}

          {currentQuestion.type === "text" && (
            <TextFieldQuestion
              question={currentQuestion.question}
              answer={currentQuestion.answers[0]}
              onQuestionChange={(value) => handleQuestionChange(currentPage - 1, value)}
              onAnswerChange={(value) => handleAnswerChange(currentPage - 1, 0, value)}
            />
          )}

          {currentQuestion.type === "photo" && <PhotoSearchQuestion />}

          <Button
            color="error"
            onClick={() => handleDeleteQuestion(currentPage - 1)}
            sx={{ mt: 2 }}
          >
            Delete Question
          </Button>

          <PaginationComponent
            count={questions.length}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateQuestPage;





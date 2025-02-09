import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Tabs,
  Tab,
  IconButton,
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
  const [questionType, setQuestionType] = useState("test");
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", ""], correctIndex: 0 },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef(null);

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
    setQuestions([...questions, { question: "", answers: ["", ""], correctIndex: 0 }]);
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

    console.log({ questName, description, timeLimit, questions });
  };

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
            sx={{ mb: 2, input: { color: "#000" } }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2, input: { color: "#000" } }}
          />
          <TextField
            fullWidth
            label="Time Limit"
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            sx={{ mb: 2, input: { color: "#000" } }}
          />
          <Typography variant="body1" sx={{ mt: 4 }}>
            edit your questions there. There are left {questions.length - filledQuestionsCount} questions to fill.
          </Typography>
          <Button
            variant="outlined"
            onClick={handleAddQuestion}
            sx={{ mt: 2, color: "#000", borderColor: "#000" }}
          >
            Add Question
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <Tabs
            value={questionType}
            onChange={(e, value) => setQuestionType(value)}
            sx={{ mb: 4 }}
          >
            <Tab label="Test" value="test" />
            <Tab label="Text Field" value="text" />
            <Tab label="Photo Search" value="photo" />
          </Tabs>

          {questionType === "test" && (
            <TestQuestion
              question={questions[currentPage - 1].question}
              answers={questions[currentPage - 1].answers}
              correctIndex={questions[currentPage - 1].correctIndex}
              onQuestionChange={(value) =>
                handleQuestionChange(currentPage - 1, value)
              }
              onAnswerChange={(aIndex, value) =>
                handleAnswerChange(currentPage - 1, aIndex, value)
              }
              onCorrectAnswerChange={(value) =>
                handleCorrectAnswerChange(currentPage - 1, value)
              }
              onAddAnswer={() => handleAddAnswer(currentPage - 1)}
              onDeleteAnswer={(aIndex) =>
                handleDeleteAnswer(currentPage - 1, aIndex)
              }
              inputRef={inputRef}
            />
          )}

{questionType === "text" && (
            <TextFieldQuestion
              question={questions[currentPage - 1].question}
              answer={questions[currentPage - 1].answer}
              onQuestionChange={(value) =>
                handleQuestionChange(currentPage - 1, value)
              }
              onAnswerChange={(value) =>
                handleAnswerChange(currentPage - 1, 0, value)
              }
            />
          )}

          {questionType === "photo" && <PhotoSearchQuestion />}
          <Button
           onClick={() => handleDeleteQuestion(currentPage - 1)}
           sx={{ color: "#f00", mb: 2 }}
          >
            Delete the question
            <IconButton
            color="inherit"
          >
            <Delete />
          </IconButton>
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
        sx={{ mt: 4, bgcolor: "#000", color: "#fff" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateQuestPage;





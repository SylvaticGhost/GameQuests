import React, { useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";
import { Box, Button, Container, LinearProgress, TextField, Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const TextFieldProcess = ({ questId, currentQuestionIndex, setCurrentQuestionIndex, totalQuestions }) => {
  const [typedAnswer, setTypedAnswer] = useState("");

  const mockQuestData = {
    id: questId,
    title: "Sample Quest Title",
    description: "This is a sample description for the quest. It contains multiple questions to test your knowledge.",
    questions: [
      { id: 4, text: "Question 4: What is the capital of Germany?", type: "text" },
      { id: 5, text: "Question 5: What is the square root of 16?", type: "text" },
    ],
  };

  const currentQuestion = mockQuestData.questions[currentQuestionIndex - 3];

  const handleAnswerChange = (event) => {
    setTypedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTypedAnswer("");
    }
  };

  const handlePageChange = (page) => {
    setCurrentQuestionIndex(page - 1);
    setTypedAnswer("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      {/* Progress Bar */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
        <Typography variant="body1" sx={{ mr: 1, fontWeight: "bold" }}>
          Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(currentQuestionIndex / totalQuestions) * 100}
          sx={{ flex: 1, height: 8, borderRadius: 4 }}
        />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {Math.round((currentQuestionIndex / totalQuestions) * 100)}%
        </Typography>
      </Box>

      {/* Timer */}
      <Typography variant="body2" sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
        <AccessTime sx={{ fontSize: 18, mr: 1 }} /> 15:08
      </Typography>

      {/* Question Text */}
      <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {currentQuestion.text}
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
        Type your answer
      </Typography>

      {/* Answer Input */}
      <TextField
        fullWidth
        variant="outlined"
        value={typedAnswer}
        onChange={handleAnswerChange}
        sx={{ mb: 2 }}
      />

      {/* Pagination */}
      <PaginationComponent
        count={totalQuestions}
        page={currentQuestionIndex + 1}
        onChange={handlePageChange}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleNextQuestion}
        disabled={typedAnswer.trim() === ""}
        fullWidth
        sx={{ mt: 2 }}
      >
        Next
      </Button>
    </Container>
  );
};

export default TextFieldProcess;
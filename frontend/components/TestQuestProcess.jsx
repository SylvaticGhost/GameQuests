import React, { useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";
import { Box, Button, Container, LinearProgress, Radio, RadioGroup, Typography, FormControlLabel } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const TestQuestProcess = ({ questId }) => {
  const [questData, setQuestData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const mockQuestData = {
      id: questId,
      title: "Sample Quest Title",
      description: "This is a sample description for the quest. It contains multiple questions to test your knowledge.",
      questions: [
        { id: 1, text: "Question 1: What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"] },
        { id: 2, text: "Question 2: What is 2 + 2?", answers: ["3", "4", "5", "6"] },
      ],
    };

    setQuestData(mockQuestData);
  }, [questId]);

  if (!questData) {
    return <Typography>Loading...</Typography>;
  }

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentQuestionIndex(page - 1);
    setSelectedAnswer(null);
  };

  const currentQuestion = questData.questions[currentQuestionIndex];

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      {/* Progress Bar */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
        <Typography variant="body1" sx={{ mr: 1, fontWeight: "bold" }}>
          Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(currentQuestionIndex / questData.questions.length) * 100}
          sx={{ flex: 1, height: 8, borderRadius: 4 }}
        />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {Math.round((currentQuestionIndex / questData.questions.length) * 100)}%
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
        Choose correct answer
      </Typography>

      {/* Answer Options */}
      <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
        {currentQuestion.answers.map((answer, index) => (
          <FormControlLabel
            key={index}
            value={answer}
            control={<Radio />}
            label={answer}
            sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", py: 1 }}
          />
        ))}
      </RadioGroup>

      {/* Navigation */}
      <PaginationComponent
        count={questData.questions.length}
        page={currentQuestionIndex + 1}
        onChange={handlePageChange}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleNextQuestion}
        disabled={selectedAnswer === null}
        fullWidth
        sx={{ mt: 2 }}
      >
        Next
      </Button>
    </Container>
  );
};

export default TestQuestProcess;
import React, { useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";
import { Box, Button, Container, LinearProgress, Checkbox, Typography, FormControlLabel } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const TestQuestProcess = ({ questId, currentQuestionIndex, setCurrentQuestionIndex, totalQuestions }) => {
  const [questData, setQuestData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const mockQuestData = {
      id: questId,
      title: "Sample Quest Title",
      description: "This is a sample description for the quest. It contains multiple questions to test your knowledge.",
      questions: [
        { id: 1, text: "Question 1: What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"], multiple: false },
        { id: 2, text: "Question 2: What is 2 + 2?", answers: ["3", "4", "5", "6"], multiple: true },
        { id: 3, text: "Question 3: Identify the animal", coverPhoto: "https://animalsafari.com/wp-content/uploads/2022/03/alpaca.jpg", answers: [
          { id: 1, photo: "https://i.pinimg.com/1200x/b2/55/42/b255421f0b8291408a38c61248718a83.jpg", label: "Answer 1" },
          { id: 2, photo: "https://www.manhattantoy.com/cdn/shop/products/fy1x5ashh0eexiddvl0q.jpg?v=1590507238&width=1800", label: "Answer 2" },
          { id: 3, photo: "https://i.pinimg.com/1200x/2a/ac/71/2aac719f91dd11f6a3c45dbf1d566cc1.jpg", label: "Answer 3" },
          { id: 4, photo: "https://i.pinimg.com/1200x/df/56/10/df56105398b94b06b2e4c4df9c2c4bde.jpg", label: "Answer 4" },
        ], multiple: false, isPhotoQuestion: true },
      ],
    };

    setQuestData(mockQuestData);
  }, [questId]);

  if (!questData) {
    return <Typography>Loading...</Typography>;
  }

  const handleAnswerChange = (event) => {
    const value = event.target.value;
    if (currentQuestion.multiple) {
      setSelectedAnswers((prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((answer) => answer !== value)
          : [...prevSelected, value]
      );
    } else {
      setSelectedAnswers([value]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([]);
    }
  };

  const handlePageChange = (page) => {
    setCurrentQuestionIndex(page - 1);
    setSelectedAnswers([]);
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
        <Typography variant="h4" gutterBottom sx={{ bgcolor: "rgba(110, 220, 217, 0.2)", p: 1, borderRadius: 1, color: "#000000" }}>
          {currentQuestion.text}
        </Typography>
        {currentQuestion.isPhotoQuestion && (
          <img src={currentQuestion.coverPhoto} alt="Cover" style={{ width: "100%", height: "300px", objectFit: "contain", borderRadius: 8 }} />
        )}
      </Box>

      <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
        Choose correct answer{currentQuestion.multiple ? "s" : ""}
      </Typography>

      {/* Answer Options */}
      {currentQuestion.isPhotoQuestion ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {currentQuestion.answers.map((answer, index) => (
            <Box key={index} sx={{ width: "48%", mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedAnswers.includes(answer.id.toString())}
                    onChange={handleAnswerChange}
                    value={answer.id.toString()}
                  />
                }
                label={
                  <img src={answer.photo} alt={answer.label} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: 8 }} />
                }
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {answer.label}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        currentQuestion.answers.map((answer, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedAnswers.includes(answer)}
                onChange={handleAnswerChange}
                value={answer}
              />
            }
            label={answer}
            sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", py: 1 }}
          />
        ))
      )}

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
        disabled={selectedAnswers.length === 0}
        fullWidth
        sx={{ mt: 2 }}
      >
        Next
      </Button>
    </Container>
  );
};

export default TestQuestProcess;
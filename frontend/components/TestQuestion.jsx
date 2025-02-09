import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit, Image } from "@mui/icons-material";

const TestQuestion = ({
  question,
  answers,
  correctIndex,
  onQuestionChange,
  onAnswerChange,
  onCorrectAnswerChange,
  onAddAnswer,
  onDeleteAnswer,
  inputRef,
}) => {
  const [questionImage, setQuestionImage] = useState(null);
  const [answerImages, setAnswerImages] = useState(Array(answers.length).fill(null));

  const handleQuestionImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setQuestionImage(imageUrl);
    }
  };

  const handleDeleteQuestionImage = () => {
    setQuestionImage(null);
  };

  const handleAnswerImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newAnswerImages = [...answerImages];
      newAnswerImages[index] = imageUrl;
      setAnswerImages(newAnswerImages);
    }
  };

  const handleDeleteAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);

    const newAnswerImages = [...answerImages];
    newAnswerImages.splice(index, 1);

    onDeleteAnswer(index);
    setAnswerImages(newAnswerImages);
  };

  return (
    <Box>
      {/* Question Input with Image Upload */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton color="primary" component="label">
          <Image />
          <input hidden type="file" accept="image/*,video/*" onChange={handleQuestionImageUpload} />
        </IconButton>
        <TextField
          fullWidth
          multiline
          label="Question"
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          sx={{ flex: 1, mr: 1, input: { color: "#000" } }}
          inputRef={inputRef}
        />
        <IconButton color="inherit" onClick={() => inputRef.current.focus()}>
          <Edit sx={{ color: "#000" }} />
        </IconButton>
      </Box>

      {/* Display Question Image with Delete Button */}
      {questionImage && (
        <Box sx={{ mb: 2, position: "relative", display: "inline-block" }}>
          <Typography variant="body2">Question Image:</Typography>
          <img
            src={questionImage}
            alt="Question"
            style={{
              width: "100%",
              maxHeight: 320,
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(255,255,255,0.8)" }}
            onClick={handleDeleteQuestionImage}
          >
            <Delete sx={{ color: "#f00" }} />
          </IconButton>
        </Box>
      )}

      {/* Answer Inputs with Image Upload */}
      {answers.map((answer, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton color="primary" component="label">
            <Image />
            <input hidden type="file" accept="image/*" onChange={(event) => handleAnswerImageUpload(index, event)} />
          </IconButton>
          <RadioGroup
            row
            value={correctIndex.toString()}
            onChange={(e) => onCorrectAnswerChange(parseInt(e.target.value))}
          >
            <FormControlLabel
              value={index.toString()}
              control={<Radio sx={{ color: "#000" }} />}
              label=""
            />
          </RadioGroup>

          {/* Show Image or Text Input Based on Selection */}
          {answerImages[index] ? (
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <img
                src={answerImages[index]}
                alt={`Answer ${index + 1}`}
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
              <IconButton
                sx={{ position: "absolute", top: 4, right: 4, bgcolor: "rgba(255,255,255,0.8)" }}
                onClick={() => handleDeleteAnswer(index)}
              >
                <Delete sx={{ color: "#f00" }} />
              </IconButton>
            </Box>
          ) : (
            <TextField
              fullWidth
              label={`Answer ${index + 1}`}
              value={answer}
              onChange={(e) => onAnswerChange(index, e.target.value)}
              sx={{ input: { color: "#000" } }}
            />
          )}
        </Box>
      ))}

      {/* Add Answer Button */}
      <Button
        variant="outlined"
        startIcon={<Add sx={{ color: "#000" }} />}
        onClick={onAddAnswer}
        sx={{ mb: 2, color: "#000", borderColor: "#000" }}
      >
        Add Answer
      </Button>
    </Box>
  );
};

export default TestQuestion;




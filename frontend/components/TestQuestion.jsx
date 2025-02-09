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
import { Add, Delete, Edit, Image, Videocam } from "@mui/icons-material";

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
  const [questionMedia, setQuestionMedia] = useState({ type: null, url: null });
  const [answerImages, setAnswerImages] = useState(Array(answers.length).fill(null));

  const handleQuestionMediaUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.startsWith("video/") ? "video" : "image";
      const mediaUrl = URL.createObjectURL(file);
      setQuestionMedia({ type: fileType, url: mediaUrl });
    }
  };

  const handleDeleteQuestionMedia = () => {
    setQuestionMedia({ type: null, url: null });
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
      {/* Question Input with Image/Video Upload */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton color="primary" component="label">
          <Image />
          <input hidden type="file" accept="image/*,video/*" onChange={handleQuestionMediaUpload} />
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

      {/* Display Question Media with Delete Button */}
      {questionMedia.url && (
        <Box sx={{ mb: 2, position: "relative", display: "inline-block" }}>
          <Typography variant="body2">Question Media:</Typography>
          {questionMedia.type === "image" ? (
            <img
              src={questionMedia.url}
              alt="Question"
              style={{ width: "100%", maxHeight: 300, objectFit: "contain", borderRadius: 8 }}
            />
          ) : (
            <video
              src={questionMedia.url}
              controls
              style={{ width: "100%", maxHeight: 300, borderRadius: 8 }}
            />
          )}
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(255,255,255,0.8)" }}
            onClick={handleDeleteQuestionMedia}
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
                  width: "120px",
                  height: "120px",
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





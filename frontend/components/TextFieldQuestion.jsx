import React from "react";
import { Box, TextField } from "@mui/material";

const TextFieldQuestion = ({ question, answer, onQuestionChange, onAnswerChange }) => {
  return (
    <Box>
      <TextField
        fullWidth
        multiline
        label="Question"
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        sx={{ mb: 2, input: { color: "#000" } }}
      />
      <TextField
        fullWidth
        multiline
        label="Add your answer here"
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        sx={{ mb: 2, input: { color: "#000" } }}
      />
    </Box>
  );
};

export default TextFieldQuestion;

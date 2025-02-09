import React from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

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
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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

      {answers.map((answer, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
          <TextField
            fullWidth
            label={`Answer ${index + 1}`}
            value={answer}
            onChange={(e) => onAnswerChange(index, e.target.value)}
            sx={{ input: { color: "#000" } }}
          />
          <IconButton color="inherit" onClick={() => onDeleteAnswer(index)}>
            <Delete sx={{ color: "#f00" }} />
          </IconButton>
        </Box>
      ))}

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

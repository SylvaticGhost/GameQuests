import React, { useState, useRef } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import { Add, Delete, Image, Videocam, Link } from "@mui/icons-material";

const TextFieldQuestion = ({ question, answer, onQuestionChange, onAnswerChange }) => {
    const [questionMedia, setQuestionMedia] = useState({ type: null, url: null });
  const inputRef = useRef(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [showLinkField, setShowLinkField] = useState(false);

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

  const handleAddYoutubeLink = () => {
    setShowLinkField(true);
  };

  const handleDeleteYoutubeLink = () => {
    setYoutubeLink("");
    setShowLinkField(false);
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
               <IconButton color="primary" onClick={handleAddYoutubeLink}>
                        <Link />
                      </IconButton>
            </Box>

            {/* Display Question Media with Delete Button */}
            {questionMedia.url && (
              <Box sx={{ mb: 2, position: "relative", display: "inline-block" }}>
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

               {/* YouTube Link Input */}
                  {showLinkField && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <TextField
                        fullWidth
                        label="YouTube Video Link"
                        value={youtubeLink}
                        onChange={(e) => setYoutubeLink(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=example"
                      />
                      <IconButton onClick={handleDeleteYoutubeLink}>
                        <Delete sx={{ color: "#f00" }} />
                      </IconButton>
                    </Box>
                  )}
                      {/* Show YouTube Link */}
                      {youtubeLink && (
                    <Box sx={{ mt: 1, mb: 3 }}>
                      <a
                        href={youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1e88e5", textDecoration: "none", fontWeight: "bold" }}
                      >
                        Open YouTube Video
                      </a>
                    </Box>
                  )}

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

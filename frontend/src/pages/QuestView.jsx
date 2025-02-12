import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    LinearProgress,
    TextField,
    Card,
    CardContent,
    Rating,
    Grid,
    Stack
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";


const QuestView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reviews, setReviews] = useState([
      {
        title: "Review title",
        name: "Name",
        rating: 4,
        text: "This quiz was a lot of fun! The questions were not too easy, but not too hard either. The only reason I’m giving it 4 out of 5 is that I wish it had a few more questions. Overall, a great experience!",
      },
    ]);
    const [newReview, setNewReview] = useState({ title: "", text: "", rating: 0 });

    const handleReviewSubmit = () => {
      setReviews([...reviews, { ...newReview, name: "Name" }]);
      setNewReview({ title: "", text: "", rating: 0 });
    };

    const handleReviewCancel = () => {
      setNewReview({ title: "", text: "", rating: 0 });
    };

    const handleShare = () => {
      navigator.clipboard.writeText("Check out this amazing quiz!").then(() => {
        alert("Link copied to clipboard!");
      });
    };

    const handleContinueClick = () => {
      navigate(`/quest_complete?id=${id}`);
    };

    return (
      <Box sx={{ display: "flex", padding: 3, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h3" fontWeight="bold" marginBottom={2} textAlign="left">
              Title
            </Typography>
            <Typography variant="body1" marginBottom={2} textAlign="left">
              Test your knowledge and have fun with this exciting quiz! Featuring a mix of engaging questions, this quiz will challenge you while keeping things entertaining. Whether you're playing solo or with friends, see how well you can score and learn something new along the way!
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" onClick={handleContinueClick}>
                Continue
              </Button>
                        <Button variant="outlined" onClick={handleShare}>Share</Button>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="body1" textAlign="left">Progress</Typography>
                    <LinearProgress variant="determinate" value={50} sx={{ height: 10, borderRadius: 5, marginBottom: 1 }} />
                    <Typography variant="body2" textAlign="left">You have 5 questions left to answer. Keep going, you can do it!</Typography>
                </Box>
            </Box>

            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ marginBottom: 4 }}>
                    <Typography variant="h5" marginBottom={2} fontWeight="bold" textAlign="left">Reviews</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            height: "400px",
                            overflowY: "auto",
                            paddingRight: "8px"
                        }}
                    >
                        {reviews.map((review, index) => (
                            <Card
                                key={index}
                                sx={{
                                    boxShadow: "none",
                                    border: "1px solid #ddd",
                                    borderRadius: 2,
                                    flexShrink: 0
                                }}
                            >
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography variant="h6" textAlign="left">{review.title}</Typography>
                                            <Typography variant="body2" textAlign="left" color="text.secondary">{review.name}</Typography>
                                        </Box>
                                        <Rating value={review.rating} precision={0.5} readOnly size="small" sx={{ marginY: 1 }} />
                                    </Stack>
                                    <Typography variant="body2" textAlign="left">{review.text}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                </Box>
                <Box>
                    <Typography variant="h5" marginBottom={2} fontWeight="bold">Completed this quest? Leave a review!</Typography>
                    <TextField
                        label="Title"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={newReview.title}
                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    />
                    <TextField
                        label="Your review"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    />
                    <Rating
                        size="large"
                        sx={{ marginY: 2 }}
                        precision={0.5}
                        value={newReview.rating}
                        onChange={(e, value) => setNewReview({ ...newReview, rating: value || 0 })}
                    />
                    <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                        <Button variant="contained" onClick={handleReviewSubmit}>Submit</Button>
                        <Button variant="outlined" onClick={handleReviewCancel}>Cancel</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default QuestView;

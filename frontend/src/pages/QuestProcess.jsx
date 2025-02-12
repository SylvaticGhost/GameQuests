import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TestQuestProcess from "../../components/TestQuestProcess";
import TextFieldProcess from "../../components/TextFieldProcess";

const QuestProcess = () => {
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const totalQuestions = 5; // Total number of questions (3 from TestQuestProcess + 2 from TextFieldProcess)

  return (
    <div>
      {currentQuestionIndex < 3 ? (
        <TestQuestProcess
          questId={id}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      ) : (
        <TextFieldProcess
          questId={id}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      )}
    </div>
  );
};

export default QuestProcess;

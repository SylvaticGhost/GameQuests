import React from "react";
import { useParams } from "react-router-dom";
import TestQuestProcess from "../../components/TestQuestProcess";

const QuestProcess = () => {
  const { id } = useParams();

  return (
   <TestQuestProcess questId={id}/>
  );
};

export default QuestProcess;

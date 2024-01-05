import { TResponse } from "@formbricks/types/responses";
import { TSurveyQuestion } from "@formbricks/types/surveys";

import { getLocalizedValue } from "./utils/i18n";

export const getQuestionResponseMapping = (
  survey: { questions: TSurveyQuestion[] },
  response: TResponse
): { question: string; answer: string }[] => {
  const questionResponseMapping: { question: string; answer: string }[] = [];

  for (const question of survey.questions) {
    const answer = response.data[question.id];

    questionResponseMapping.push({
      question: getLocalizedValue(question.headline, "en"),
      answer: typeof answer !== "undefined" ? answer.toString() : "",
    });
  }

  return questionResponseMapping;
};

"use client";

import { useState } from "react";

import { LocalizedEditor } from "@formbricks/ee/multiLanguage/components/LocalizedEditor";
import { TSurvey, TSurveyConsentQuestion } from "@formbricks/types/surveys";
import { Label } from "@formbricks/ui/Label";
import { LocalizedInput } from "@formbricks/ui/LocalizedInput";

interface ConsentQuestionFormProps {
  localSurvey: TSurvey;
  question: TSurveyConsentQuestion;
  questionIdx: number;
  updateQuestion: (questionIdx: number, updatedAttributes: any) => void;
  selectedLanguageCode: string;
  setSelectedLanguageCode: (languageCode: string) => void;
  isInvalid: boolean;
}

export default function ConsentQuestionForm({
  question,
  questionIdx,
  updateQuestion,
  isInvalid,
  localSurvey,
  selectedLanguageCode,
  setSelectedLanguageCode,
}: ConsentQuestionFormProps): JSX.Element {
  const [firstRender, setFirstRender] = useState(true);

  return (
    <form>
      <LocalizedInput
        id="headline"
        name="headline"
        value={question.headline}
        localSurvey={localSurvey}
        questionIdx={questionIdx}
        isInvalid={isInvalid}
        updateQuestion={updateQuestion}
        selectedLanguageCode={selectedLanguageCode}
        setSelectedLanguageCode={setSelectedLanguageCode}
      />

      <div className="mt-3">
        <Label htmlFor="subheader">Description</Label>
        <div className="mt-2">
          <LocalizedEditor
            id="subheader"
            value={question.html}
            localSurvey={localSurvey}
            isInvalid={isInvalid}
            updateQuestion={updateQuestion}
            selectedLanguageCode={selectedLanguageCode}
            setSelectedLanguageCode={setSelectedLanguageCode}
            firstRender={firstRender}
            setFirstRender={setFirstRender}
            questionIdx={questionIdx}
          />
        </div>
      </div>

      <LocalizedInput
        id="label"
        name="label"
        label="Checkbox Label"
        placeholder="I agree to the terms and conditions"
        value={question.label}
        localSurvey={localSurvey}
        questionIdx={questionIdx}
        isInvalid={isInvalid}
        updateQuestion={updateQuestion}
        selectedLanguageCode={selectedLanguageCode}
        setSelectedLanguageCode={setSelectedLanguageCode}
      />
      {/* <div className="mt-3">
        <Label htmlFor="buttonLabel">Button Label</Label>
        <Input
          id="buttonLabel"
          name="buttonLabel"
          className="mt-2"
          value={question.buttonLabel}
          placeholder={lastQuestion ? "Finish" : "Next"}
          onChange={(e) => updateQuestion(questionIdx, { buttonLabel: e.target.value })}
        />
      </div> */}
    </form>
  );
}

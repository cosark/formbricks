import Headline from "@/app/(app)/environments/[environmentId]/surveys/[surveyId]/(analysis)/summary/components/Headline";
import { questionTypes } from "@/app/lib/questions";
import { InboxIcon } from "lucide-react";
import Link from "next/link";

import { getPersonIdentifier } from "@formbricks/lib/person/util";
import { timeSince } from "@formbricks/lib/time";
import { TSurveySummaryOpenText } from "@formbricks/types/responses";
import { PersonAvatar } from "@formbricks/ui/Avatars";

interface OpenTextSummaryProps {
  questionSummary: TSurveySummaryOpenText;
  environmentId: string;
}

export default function OpenTextSummary({ questionSummary, environmentId }: OpenTextSummaryProps) {
  const questionTypeInfo = questionTypes.find((type) => type.id === questionSummary.question.type);

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
      <div className="space-y-2 px-4 pb-5 pt-6 md:px-6">
        <Headline headline={questionSummary.question.headline} />
        <div className="flex space-x-2 text-xs font-semibold text-slate-600 md:text-sm">
          <div className="flex items-center rounded-lg bg-slate-100 p-2 ">
            {questionTypeInfo && <questionTypeInfo.icon className="mr-2 h-4 w-4 " />}
            {questionTypeInfo ? questionTypeInfo.label : "Unknown Question Type"} Question
          </div>
          <div className=" flex items-center rounded-lg bg-slate-100 p-2">
            <InboxIcon className="mr-2 h-4 w-4" />
            {questionSummary.responseCount} Responses
          </div>
          {!questionSummary.question.required && (
            <div className="flex items-center  rounded-lg bg-slate-100 p-2">Optional</div>
          )}
        </div>
      </div>
      <div className="rounded-b-lg bg-white ">
        <div className="grid h-10 grid-cols-4 items-center border-y border-slate-200 bg-slate-100 text-sm font-bold text-slate-600">
          <div className="pl-4 md:pl-6">User</div>
          <div className="col-span-2 pl-4 md:pl-6">Response</div>
          <div className="px-4 md:px-6">Time</div>
        </div>
        {questionSummary.samples.map((response) => (
          <div
            key={response.id}
            className="grid grid-cols-4 items-center border-b border-slate-100 py-2 text-sm text-slate-800 md:text-base">
            <div className="pl-4 md:pl-6">
              {response.person ? (
                <Link
                  className="ph-no-capture group flex items-center"
                  href={`/environments/${environmentId}/people/${response.person.id}`}>
                  <div className="hidden md:flex">
                    <PersonAvatar personId={response.person.id} />
                  </div>
                  <p className="ph-no-capture break-all text-slate-600 group-hover:underline md:ml-2">
                    {getPersonIdentifier(response.person)}
                  </p>
                </Link>
              ) : (
                <div className="group flex items-center">
                  <div className="hidden md:flex">
                    <PersonAvatar personId="anonymous" />
                  </div>
                  <p className="break-all text-slate-600 md:ml-2">Anonymous</p>
                </div>
              )}
            </div>
            <div className="ph-no-capture col-span-2 whitespace-pre-wrap pl-6 font-semibold">
              {response.value}
            </div>
            <div className="px-4 text-slate-500 md:px-6">
              {timeSince(new Date(response.updatedAt).toISOString())}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

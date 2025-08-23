import React from "react";
import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helper";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

const Answer = ({ ans, index, totalResult, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStarts(ans)); // use original `ans`, not `answer`
    }
  }, [ans]); // run only when `ans` changes

  const renderer = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={dark}
          PreTag="div"
        />
      ) : (
        <code {...props} className="bg-zinc-800 px-1 py-0.5 rounded text-sm">
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {index === 0 && totalResult > 1 ? (
        <span className="pt-2 text-xl block text-white font-semibold">
          {answer}
        </span>
      ) : heading ? (
        <span className="pt-2 text-lg block text-white font-medium">
          {answer}
        </span>
      ) : (
        <div
          className={`${type === "q" ? "pl-1" : "pl-5"
            } text-base text-zinc-200 leading-relaxed break-words`}
        >
          <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default Answer;

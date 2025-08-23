import React from 'react';
import Answer from '../components/Answer';

const QuestionAnswer = ({ item, index }) => {
  return (
    <div
      key={index}
      className={item.type === "q" ? "flex justify-end" : "flex justify-start"}
    >
      {item.type === "q" ? (
        <div
          key={`q-${index}`}
          className="max-w-[75%] p-3 rounded-2xl w-fit text-white shadow-md
          bg-blue-500 dark:bg-zinc-700"
        >
          <Answer
            ans={item.text}
            totalResult={1}
            index={index}
            type={item.type}
          />
        </div>
      ) : (
        <ul className="space-y-2 max-w-[80%]">
          {item.text.map((ansItem, ansIndex) => (
            <li
              key={`a-${index}-${ansIndex}`}
              className="p-3 rounded-2xl w-fit shadow-md bg-red-500 text-zinc-600
                    dark:bg-zinc-800 dark:text-gray-100">
              <Answer
                ans={ansItem}
                totalResult={item.text.length}
                type={item.type}
                index={ansIndex}
              />
            </li>
          ))}
        </ul>
      )
      }
    </div>
  );
};

export default QuestionAnswer;


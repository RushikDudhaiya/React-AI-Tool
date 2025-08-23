import React, { useEffect, useRef, useState } from 'react'
import RecentSearch from './components/RecentSearch';
import QuestionAnswer from './components/QuestionAnswer';

const App = () => {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHistory, setSelectedHistory] = useState('');
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') || 'dark'
  );

  const askQuestion = async () => {
    if (!question && !selectedHistory) return false;

    if (question) {
      let history = JSON.parse(localStorage.getItem('history')) || [];
      history = history.slice(0, 19);
      history = [question, ...history];
      history = history.map((item) => item.charAt(0).toUpperCase() + item.slice(1).trim());
      history = [...new Set(history)];
      localStorage.setItem('history', JSON.stringify(history));
      setRecentHistory(history);
    }

    const payloadData = question || selectedHistory;
    const payload = { contents: [{ parts: [{ text: payloadData }] }] };

    setLoader(true);

    let response = await fetch(`${import.meta.env.VITE_API_KEY}`, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ").map((item) => item.trim());

    setResult(prev => [
      ...prev,
      { type: 'q', text: question || selectedHistory },
      { type: 'a', text: dataString }
    ]);
    setQuestion('');

    setTimeout(() => {
      if (scrollToAns.current) {
        scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
      }
    }, 100);

    setLoader(false);
  };

  const isEnter = (event) => {
    if (event.key === 'Enter') askQuestion();
  };

  useEffect(() => {
    askQuestion();
  }, [selectedHistory]);

  useEffect(() => {
    if (darkMode === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode === 'dark' ? 'dark' : 'light'}>
      {/* Theme Toggle */}
      <select
        id='select'
        name='select'
        value={darkMode}
        onChange={(e) => setDarkMode(e.target.value)}
        className='fixed text-zinc-400 text-sm bottom-0 p-3 bg-transparent'
      >
        <option value="dark">Dark 🌙</option>
        <option value="light">Light ☀️</option>
      </select>

      {/* Layout Wrapper */}
      <div className='flex flex-col md:grid md:grid-cols-5 h-screen'>

        {/* Recent Search Sidebar */}
        <div className='order-1 md:order-none border-r dark:border-zinc-700'>
          <RecentSearch
            recentHistory={recentHistory}
            setRecentHistory={setRecentHistory}
            setSelectedHistory={setSelectedHistory}
          />
        </div>

        {/* Main Content */}
        <div className='md:col-span-4 flex flex-col h-screen'>
          <h1 className='md:text-4xl text-2xl p-5 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 text-center md:text-left'>
            Hello User, Ask me Anything
          </h1>

          {/* Q&A Section */}
          <div ref={scrollToAns} className='flex-1 overflow-auto px-5 py-2 space-y-3 border-t border-b dark:border-zinc-700'>
            <ul className='space-y-3 dark:text-zinc-300 text-zinc-800'>
              {result.map((item, index) => (
                <QuestionAnswer item={item} index={index} key={index} />
              ))}

              {/* Loader inside answer box */}
              {loader && (
                <div role="status" className="flex justify-center my-4">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none">
                    <path d="M100 50.59c0 27.61-22.39 50-50 50s-50-22.39-50-50S22.39.59 50 .59s50 22.39 50 50zM9.08 50.59c0 23.6 18.32 41.92 40.92 41.92s40.92-18.32 40.92-41.92S73.6 8.67 50 8.67 9.08 26.99 9.08 50.59z" fill="currentColor" />
                    <path d="M93.97 39.04c2.43-.64 3.9-3.13 3.05-5.49a44.99 44.99 0 0 0-7.19-13.21 45.12 45.12 0 0 0-11.79-10.93 45.19 45.19 0 0 0-13.82-5.37c-4.97-.68-10.04-.6-14.96.82-2.47.64-3.93 3.14-3.29 5.58.64 2.44 3.13 3.91 5.59 3.27a33.07 33.07 0 0 1 19.71 1.88 33.07 33.07 0 0 1 14.59 12.01 33.07 33.07 0 0 1 5.6 17.21c0 2.52 2.07 4.59 4.59 4.59 2.52 0 4.59-2.07 4.59-4.59 0-7.66-2.44-15.2-6.89-21.21z" fill="currentFill" />
                  </svg>
                </div>
              )}
            </ul>
          </div>

          {/* Input Section (sticky bottom) */}
          <div className='p-5'>
            <div className='dark:bg-zinc-800 bg-red-100 w-full md:w-3/4 p-2 flex items-center border border-zinc-700 rounded-3xl mx-auto sticky bottom-0'>
              <input
                type="text"
                value={question}
                onKeyDown={isEnter}
                onChange={(e) => setQuestion(e.target.value)}
                className='flex-1 p-3 rounded-l-2xl outline-none dark:bg-zinc-800 bg-red-100 dark:text-white'
                placeholder='Ask me everything'
              />
              <button
                onClick={askQuestion}
                className='px-4 py-2 dark:text-white text-zinc-800 hover:bg-red-200 dark:hover:bg-zinc-700 rounded-r-2xl'>
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;

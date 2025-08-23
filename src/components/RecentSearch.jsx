import React from "react";

const RecentSearch = ({ recentHistory, setRecentHistory, setSelectedHistory }) => {

  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  }

  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem('history'));
    history = history.filter((item) => item !== selectedItem);
    setRecentHistory(history);
    localStorage.setItem('history', JSON.stringify(history));
  }

  return (
    <>
      <div className='w-full md:col-span-1 dark:bg-zinc-700 bg-red-100 pt-3
      max-h-[40vh] md:max-h-full overflow-y-auto md:overflow-visible text-center md:text-left'>

        {/* Title */}
        <h1 className='text-lg sm:text-xl dark:text-white text-zinc-800
        flex items-center justify-center md:justify-between px-3'>
          <span>Recent Search</span>
          <button onClick={clearHistory}
            className='text-white cursor-pointer ml-2 p-1 bg-red-500 hover:bg-red-600 rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#FFFFFF">
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336Z" />
            </svg>
          </button>
        </h1>

        {/* History List */}
        <ul className='mt-3'>
          {
            recentHistory && recentHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between px-3 py-2">

                <li
                  onClick={() => setSelectedHistory(item)}
                  className='w-full px-2 truncate text-center md:text-left
                  dark:text-zinc-300 text-zinc-700 cursor-pointer
                  dark:hover:bg-zinc-800 hover:bg-red-200                     dark:hover:text-zinc-300 hover:text-zinc-900 rounded-md py-1'>
                  {item}
                </li>

                <button
                  onClick={() => clearSelectedHistory(item)}
                  className='ml-2 p-1 rounded-md bg-zinc-600 hover:bg-zinc-800 text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#FFFFFF">
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336Z" />
                  </svg>
                </button>
              </div>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default RecentSearch;

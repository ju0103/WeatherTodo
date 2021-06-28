/* 로그인 버튼 혹은 회원가입 버튼을 클릭한 경우처럼, 특정상황에서만 렌더링 되도록 */
import React, { useState, createContext } from "react";

const ProgressContext = createContext({
  inProgress: false,
  spinner: () => {},
});

const ProgressProvider = ({ children }) => {
  const [inProgress, setInProgress] = useState(false);
  const spinner = {
    start: () => setInProgress(true),
    stop: () => setInProgress(false),
  };
  const value = { inProgress, spinner };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export { ProgressContext, ProgressProvider };

// 인증 상태에 따라 AuthStack or MainStack rendering
import React, { useState, createContext } from "react";

const UserContext = createContext({
  user: { email: null, uid: null },
  dispatch: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = ({ email, uid }) => {
    // User 객체 수정 가능한 dispatch 함수
    setUser({ email, uid });
  };
  const value = { user, dispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };

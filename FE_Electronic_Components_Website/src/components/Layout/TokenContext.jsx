import { createContext, useState, useContext } from "react";

// Tạo Context
const TokenContext = createContext();

// Tạo Provider
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Tạo custom hook để dễ dàng sử dụng Context trong các thành phần khác
export const useToken = () => useContext(TokenContext);

export default TokenContext;
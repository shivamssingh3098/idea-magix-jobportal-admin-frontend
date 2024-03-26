import React, { createContext, useState } from "react";
export const AdminDataContext = createContext({
  updateAdminData: () => {},
});
const AdminContext = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [adminData, setAdminData] = useState({});

  const updateAdminData = (data) => {
    setAdminData(data);
  };

  return (
    <AdminDataContext.Provider
      value={{
        updateAdminData,
        adminData,

        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </AdminDataContext.Provider>
  );
};

export default AdminContext;

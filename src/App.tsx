// import { useState } from "react";
// import { UserForm } from "./components/UserForm";
import { UserList } from "./components/UserList";
import { NavLink, Route, Routes } from "react-router";
import { UserListInfinity } from "./components/UserListInfinity";
import classNames from "classnames";
import { UserForm } from "./components/UserForm/UserForm";

function App() {
  const linkCls = "font-medium   hover:underline";
  return (
    <main className="p-4 flex flex-col gap-3">
      <nav className="flex m-y-2 gap-2 ">
        <NavLink
          className={({ isActive }) =>
            classNames(linkCls, isActive ? "text-blue-600" : "text-blue-300")
          }
          to="/"
        >
          Пользователи
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames(linkCls, isActive ? "text-blue-600" : "text-blue-300")
          }
          to="/users-infinity"
        >
          Бесконечная загрузка
        </NavLink>
      </nav>
      <div className="flex justify-between mb-3">
        <h1 className="text-3xl">Пользователи</h1>
        <UserForm />
      </div>

      <Routes>
        <Route element={<UserList />} path="/" />
        <Route element={<UserListInfinity />} path="/users-infinity" />
        {/* {isOpen && <UserForm />} */}
      </Routes>
    </main>
  );
}

export default App;

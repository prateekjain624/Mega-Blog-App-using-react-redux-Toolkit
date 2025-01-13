import React from "react";
import { Container, Logout, Logo } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      path: "/",
      active: true,
    },
    {
      label: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      label: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      label: "Add Post",
      path: "/addpost",
      active: authStatus,
    },
    {
      label: "All Posts",
      path: "/allposts",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.label}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

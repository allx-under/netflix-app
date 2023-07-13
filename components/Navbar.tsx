import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import Input from "./Input";
import SearchList from "./SearchList";
import useMovieList from "@/hooks/useMovieList";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [background, setBackground] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { data: movies } = useMovieList();

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prevState) => !prevState);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prevState) => !prevState);
  }, []);

  const toggleSearchInput = useCallback(() => {
    setShowSearchInput((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setBackground(true);
      } else {
        setBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`flex flex-row items-center px-4 md:px-16 py-6 transition duration-500  ${
          background ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" link="/" />
          <NavbarItem label="Series" link="/" />
          <NavbarItem label="Films" link="/" />
          <NavbarItem label="New & Popular" link="/" />
          <NavbarItem label="My List" link="/my-list" />
          <NavbarItem label="Browse by languages" link="/" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center relative">
          <div
            onClick={toggleSearchInput}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition "
          >
            <BsSearch />
          </div>
          {showSearchInput && (
            <div className="absolute -top-1 -left-64">
              <Input
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                id="search"
                label="Search"
                value={inputValue}
                type="text"
              />
              {inputValue && (
                <SearchList
                  movies={movies.filter((movie: MovieType) =>
                    movie.title.toLowerCase().includes(inputValue.toLowerCase())
                  )}
                />
              )}
            </div>
          )}
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative "
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="Profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import Input from "@/components/Input";
import axios from "axios";
import { ChangeEvent, useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(
    () =>
      setVariant((currVariant) =>
        currVariant === "login" ? "register" : "login"
      ),
    []
  );

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        password,
        name,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, login, name, password]);

  return (
    <div className="relative w-full h-full bg-[url('/images/hero.jpeg')] bg-fixed bg-cover bg-center bg-no-repeat">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="Logo netflix"
            width="180"
            height="12"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Create an account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  id="name"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              )}
              <Input
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Input
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <button
              type="submit"
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Register"}
            </button>
            <div className="flex flex-row items-center justify-center mt-8 gap-4">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer hover:opacity-70 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer hover:opacity-70 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

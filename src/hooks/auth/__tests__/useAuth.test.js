jest.mock("axios", () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
    },
  })),
}));

import { renderHook, act } from "@testing-library/react";
import { useLogin, useRegister } from "../useAuth";

import { loginUser, registerUser } from "../../../api/auth";
import { useAuth as useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock dependencies
jest.mock("../../../api/auth");
jest.mock("../../../contexts/AuthContext");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("useLogin hook", () => {
  const mockNavigate = jest.fn();
  const mockSetUser = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useAuthContext.mockReturnValue({ setUser: mockSetUser });

    localStorage.clear();
    jest.clearAllMocks();
  });

  test("successful login", async () => {
    const mockResponse = {
      token: "fake-token",
      user: { id: 1, name: "John" },
    };

    loginUser.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login("test@mail.com", "123456");
    });

    expect(loginUser).toHaveBeenCalledWith({
      email: "test@mail.com",
      password: "123456",
    });

    expect(localStorage.getItem("token")).toBe("fake-token");
    expect(localStorage.getItem("user")).toBe(
      JSON.stringify(mockResponse.user)
    );

    expect(mockSetUser).toHaveBeenCalledWith(mockResponse.user);
    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  test("login failure sets error", async () => {
    loginUser.mockRejectedValue(new Error("Invalid"));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login("wrong@mail.com", "badpass");
    });

    expect(result.current.error).toBe("Invalid email or password");
    expect(result.current.loading).toBe(false);
  });

  test("sets error if passwords do not match", async () => {
    const { result } = renderHook(() => useRegister());

        await act(async () => {
            await result.current.register({
            name: "John",
            email: "john@mail.com",
            password: "123",
            confirmPassword: "456",
            role: "user",
            });
        });

    expect(result.current.error).toBe("Passwords do not match.");
    expect(registerUser).not.toHaveBeenCalled();
  });

 test("successful registration", async () => {
    jest.useFakeTimers();

    const mockNavigate = jest.fn();
    const mockSetUser = jest.fn();

    useNavigate.mockReturnValue(mockNavigate);
    useAuthContext.mockReturnValue({ setUser: mockSetUser });

    const mockResponse = {
        token: "fake-token",
        user: { id: 1, name: "John" },
    };

    registerUser.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useRegister());

    await act(async () => {
        await result.current.register({
        name: "John",
        email: "john@mail.com",
        password: "123",
        confirmPassword: "123",
        role: "user",
        });
    });

    expect(registerUser).toHaveBeenCalled();
    expect(localStorage.getItem("token")).toBe("fake-token");
    expect(mockSetUser).toHaveBeenCalledWith(mockResponse.user);
    expect(result.current.success).toBe(
        "Registration successful! Redirecting..."
    );

    // fast-forward timer
    act(() => {
        jest.runAllTimers();
    });

    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });

    jest.useRealTimers();
 });
});
jest.mock("../api", () => ({
  post: jest.fn(),
}));

import api from "../api";
import { loginUser, registerUser } from "../auth";

describe("Auth API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("loginUser sends correct payload and returns data", async () => {
    const mockResponse = {
      data: {
        token: "fake-token",
        user: { id: 1, email: "test@example.com" },
      },
    };

    api.post.mockResolvedValue(mockResponse);

    const result = await loginUser({
      email: "test@example.com",
      password: "secret",
    });

    expect(api.post).toHaveBeenCalledWith("/api/login", {
      email: "test@example.com",
      password: "secret",
    });

    expect(result).toEqual(mockResponse.data);
  });

  test("registerUser sends correct payload and returns data", async () => {
    const mockResponse = {
      data: {
        token: "fake-token",
        user: { id: 2, email: "new@example.com" },
      },
    };

    api.post.mockResolvedValue(mockResponse);

    const result = await registerUser({
      name: "John",
      email: "new@example.com",
      password: "secret",
      password_confirmation: "secret",
      role: "user",
    });

    expect(api.post).toHaveBeenCalledWith("/api/register", {
      name: "John",
      email: "new@example.com",
      password: "secret",
      password_confirmation: "secret",
      role: "user",
    });

    expect(result).toEqual(mockResponse.data);
  });
});

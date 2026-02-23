// mock axios BEFORE importing api
jest.mock("axios", () => {
  const mockInstance = {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
  };

  return {
    create: jest.fn(() => mockInstance),
  };
});

describe("api configuration", () => {
  let axios;
  let api;

  beforeEach(() => {
    jest.resetModules(); // clear module cache

    jest.doMock("axios", () => {
      const mockInstance = {
        interceptors: {
          request: {
            use: jest.fn(),
          },
        },
      };

      return {
        create: jest.fn(() => mockInstance),
      };
    });

    axios = require("axios");
    api = require("../api").default;
  });

  test("creates axios instance with correct baseURL", () => {
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "http://localhost:8000",
    });
  });

  test("registers request interceptor", () => {
    expect(api.interceptors.request.use).toHaveBeenCalledTimes(1);
  });
});

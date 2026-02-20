jest.mock("../api", () => ({
  get: jest.fn(),
}));

import api from "../api";
import { getJob } from "../jobs";

describe("Jobs API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getJob calls correct endpoint and returns job data", async () => {
    const mockJob = {
      id: 42,
      title: "Backend Developer",
      skills: ["Go", "Docker"],
    };

    api.get.mockResolvedValue({
      data: {
        job: mockJob,
      },
    });

    const result = await getJob(42);

    expect(api.get).toHaveBeenCalledWith("/api/work-jobs/42");
    expect(result).toEqual(mockJob);
  });

  test("getJob throws error when API fails", async () => {
    api.get.mockRejectedValue(new Error("Not Found"));

    await expect(getJob(999)).rejects.toThrow("Not Found");
  });
});

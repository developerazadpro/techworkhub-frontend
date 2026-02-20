jest.mock("../api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

import api from "../api";
import {
  getMySkills,
  updateMySkills,
  getOpenJobs,
  acceptJob,
  getMyJobs,
} from "../technician";


describe("Technician API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getMySkills returns skills array", async () => {
    api.get.mockResolvedValue({
      data: {
        skills: ["Go", "React"],
      },
    });

    const result = await getMySkills();

    expect(api.get).toHaveBeenCalledWith("/api/technician/skills");
    expect(result).toEqual(["Go", "React"]);
  });

  test("updateMySkills sends skill IDs and returns response data", async () => {
    api.put.mockResolvedValue({
      data: {
        success: true,
      },
    });

    const result = await updateMySkills([1, 2, 3]);

    expect(api.put).toHaveBeenCalledWith("/api/technician/skills", {
      skill_ids: [1, 2, 3],
    });
    expect(result).toEqual({ success: true });
  });

  test("getOpenJobs returns jobs array when present", async () => {
    api.get.mockResolvedValue({
      data: {
        jobs: [{ id: 1 }, { id: 2 }],
      },
    });

    const result = await getOpenJobs();

    expect(api.get).toHaveBeenCalledWith("/api/work-jobs");
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  test("getOpenJobs returns empty array when jobs is missing", async () => {
    api.get.mockResolvedValue({
      data: {},
    });

    const result = await getOpenJobs();

    expect(result).toEqual([]);
  });

  test("acceptJob sends job ID and returns response data", async () => {
    api.post.mockResolvedValue({
      data: {
        message: "Job accepted",
      },
    });

    const result = await acceptJob(10);

    expect(api.post).toHaveBeenCalledWith("/api/work-jobs/10/accept");
    expect(result).toEqual({ message: "Job accepted" });
  });

  test("getMyJobs returns jobs array when valid", async () => {
    api.get.mockResolvedValue({
      data: {
        jobs: [{ id: 5 }],
      },
    });

    const result = await getMyJobs();

    expect(api.get).toHaveBeenCalledWith("/api/my-jobs");
    expect(result).toEqual([{ id: 5 }]);
  });

  test("getMyJobs returns empty array when jobs is not an array", async () => {
    api.get.mockResolvedValue({
      data: {
        jobs: null,
      },
    });

    const result = await getMyJobs();

    expect(result).toEqual([]);
  });

  test("acceptJob throws error when API fails", async () => {
    api.post.mockRejectedValue(new Error("Forbidden"));

    await expect(acceptJob(99)).rejects.toThrow("Forbidden");
  });
});

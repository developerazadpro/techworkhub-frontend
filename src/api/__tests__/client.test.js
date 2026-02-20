jest.mock("../api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

import api from "../api";
import {
  getClientJobs,
  createJob,
  updateJob,
  resolveSkillNamesToIds,
} from "../client";


describe("Client API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getClientJobs returns jobs array when response is valid", async () => {
    api.get.mockResolvedValue({
      data: {
        jobs: [{ id: 1 }, { id: 2 }],
      },
    });

    const jobs = await getClientJobs();

    expect(api.get).toHaveBeenCalledWith("/api/client/my-jobs");
    expect(jobs).toEqual([{ id: 1 }, { id: 2 }]);
  });

  test("getClientJobs returns empty array when jobs is not an array", async () => {
    api.get.mockResolvedValue({
      data: {
        jobs: null,
      },
    });

    const jobs = await getClientJobs();

    expect(jobs).toEqual([]);
  });

  test("createJob sends payload and returns response data", async () => {
    const payload = { title: "New Job", budget: 500 };

    api.post.mockResolvedValue({
      data: { id: 10, ...payload },
    });

    const result = await createJob(payload);

    expect(api.post).toHaveBeenCalledWith("/api/work-jobs", payload);
    expect(result).toEqual({ id: 10, title: "New Job", budget: 500 });
  });

  test("updateJob sends id and payload and returns response data", async () => {
    const payload = { title: "Updated Job" };

    api.put.mockResolvedValue({
      data: { id: 5, title: "Updated Job" },
    });

    const result = await updateJob(5, payload);

    expect(api.put).toHaveBeenCalledWith("/api/work-jobs/5", payload);
    expect(result).toEqual({ id: 5, title: "Updated Job" });
  });

  test("resolveSkillNamesToIds sends skills and returns skill IDs", async () => {
    api.post.mockResolvedValue({
      data: {
        skill_ids: [1, 3, 7],
      },
    });

    const result = await resolveSkillNamesToIds(["Go", "React", "Docker"]);

    expect(api.post).toHaveBeenCalledWith(
      "/api/skills/resolve-name-to-id",
      {
        skills: ["Go", "React", "Docker"],
      }
    );

    expect(result).toEqual([1, 3, 7]);
  });
});

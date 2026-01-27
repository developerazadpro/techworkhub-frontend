export const JOB_STATUS_TRANSITIONS = {
  open: ["assigned"],
  assigned: ["in_progress", "cancelled"],
  in_progress: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

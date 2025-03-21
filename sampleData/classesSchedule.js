import { classes } from "./classes";

export const classesSchedule = {
  Monday: [
    { ...classes[4], startTime: [9, 30] },
    { ...classes[1], startTime: [11, 0] },
    { ...classes[2], startTime: [13, 45] },
  ],
  Tuesday: [
    { ...classes[5], startTime: [9, 30] },
    { ...classes[0], startTime: [11, 0] },
    { ...classes[8], startTime: [13, 45] },
  ],
  Wednesday: [
    { ...classes[3], startTime: [9, 30] },
    { ...classes[5], startTime: [11, 0] },
    { ...classes[7], startTime: [13, 45] },
  ],
  Thursday: [
    { ...classes[2], startTime: [9, 30] },
    { ...classes[4], startTime: [11, 0] },
    { ...classes[0], startTime: [13, 45] },
    { ...classes[1], startTime: [15, 15] },
  ],
  Friday: [
    { ...classes[6], startTime: [9, 30] },
    { ...classes[3], startTime: [13, 45] },
  ],
  Saturday: [classes[9]],
};

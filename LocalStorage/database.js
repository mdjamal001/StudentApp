import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as SQLite from "expo-sqlite";

export const db_init = async () => {
  const weekdays = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };
  const branch = await AsyncStorage.getItem("branch");
  const semester = await AsyncStorage.getItem("semester");

  const db = await SQLite.openDatabaseAsync("localStorage");

  await db.execAsync("PRAGMA foreign_keys = ON");

  await db.execAsync(`DROP TABLE IF EXISTS attendance`);
  await db.execAsync(`DROP TABLE IF EXISTS timetable`);
  await db.execAsync(`DROP TABLE IF EXISTS subjects`);

  await db.execAsync(`
    CREATE TABLE subjects (
      id INTEGER PRIMARY KEY,
      subject_name TEXT,
      attendance_percent INTEGER,
      semester INTEGER,
      total_classes INTEGER,
      attended_classes INTEGER
    )
  `);

  await db.execAsync(`
    CREATE TABLE timetable (
      id INTEGER PRIMARY KEY,
      weekday TEXT,
      start_time TEXT,
      end_time TEXT,
      subject_id INTEGER,
      semester INTEGER,
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )
  `);

  await db.execAsync(
    `CREATE TABLE attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      subject_id INTEGER,
      status TEXT,
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )`
  );

  //Make an API call to fetch data of timetable and subjects
  const timetable = (
    await axios.get(
      `https://attendanceapi-production-a2d1.up.railway.app/api/timetable?branch=${branch}&semester=${semester} `
    )
  ).data;
  const subjects = (
    await axios.get(
      `https://attendanceapi-production-a2d1.up.railway.app/api/subjects?branch=${branch}&semester=${semester}`
    )
  ).data;

  for (let subject of subjects) {
    await db.execAsync(
      `INSERT INTO subjects (id, subject_name, attendance_percent, semester, total_classes, attended_classes) VALUES (${subject.subject_id}, "${subject.subject_name}", 0, ${semester}, 0, 0)`
    );
  }

  for (let classData of timetable) {
    await db.execAsync(
      `INSERT INTO timetable (id, weekday, start_time, end_time, subject_id, semester) VALUES (${
        classData.timetable_id
      }, "${weekdays[classData.day_of_week]}", "${classData.start_time}", "${
        classData.end_time
      }", ${classData.subject_id}, ${semester})`
    );
  }

  const timetableData = await db.getAllAsync(`SELECT * FROM timetable`);
  const subjectData = await db.getAllAsync(`SELECT * FROM subjects`);

  timetableData.forEach((classData) => {
    console.log(classData);
  });
  subjectData.forEach((subject) => {
    console.log(subject);
  });
};

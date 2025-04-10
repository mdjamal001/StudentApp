import * as SQLite from "expo-sqlite";

export const db_init = async () => {
  const db = await SQLite.openDatabaseAsync("localStorage");

  await db.execAsync("PRAGMA foreign_keys = ON");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT,
      attendance_percent INTEGER,
      semester INTEGER,
      total_classes INTEGER,
      attended_classes INTEGER,
      teacher TEXT
    )
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS timetable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      weekday TEXT,
      start_time TEXT,
      end_time TEXT,
      subject_id INTEGER,
      semester INTEGER,
      classroom TEXT,
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )
  `);

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      subject_id INTEGER,
      status TEXT,
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )`
  );

  console.log("Database initialized");

  const res1 = await db.getFirstAsync(
    "SELECT * FROM subjects WHERE semester=4"
  );
  if (!res1) {
    await db.execAsync(`
        INSERT INTO subjects 
          (subject, attendance_percent, semester, total_classes, attended_classes, teacher) 
        VALUES
          ("Discrete Mathematics", 0, 4, 0, 0, "TBD"),
          ("Business Economics & Financial Analysis", 0, 4, 0, 0, "TBD"),
          ("Operating Systems", 0, 4, 0, 0, "TBD"),
          ("Database Management System", 0, 4, 0, 0, "TBD"),
          ("Software Engineering", 0, 4, 0, 0, "TBD"),
          ("Skills Development Lab", 0, 4, 0, 0, "TBD"),
          ("OS Lab", 0, 4, 0, 0, "TBD"),
          ("DBMS Lab", 0, 4, 0, 0, "TBD"),
          ("Constitution Of India", 0, 4, 0, 0, "TBD"),
          ("RRP", 0, 4, 0, 0, "TBD")
      `);
  }

  console.log("Subjects initialized");

  const res2 = await db.getFirstAsync(
    "SELECT * FROM timetable WHERE semester=4"
  );
  if (!res2) {
    await db.execAsync(`
        INSERT INTO timetable 
          (weekday, start_time, end_time, subject_id, semester, classroom) 
        VALUES
          ("Monday", "09:30", "11:00", 5, 4, "Room A"),
          ("Monday", "11:00", "12:30", 2, 4, "Room A"),
          ("Monday", "13:45", "15:15", 3, 4, "Room A"),
          
          ("Tuesday", "09:30", "11:00", 9, 4, "Room A"),
          ("Tuesday", "11:00", "12:30", 1, 4, "Room A"),
          ("Tuesday", "13:45", "15:45", 6, 4, "Lab 1"),
          
          ("Wednesday", "09:30", "11:00", 4, 4, "Room A"),
          ("Wednesday", "11:00", "12:30", 9, 4, "Room A"),
          ("Wednesday", "13:45", "15:45", 8, 4, "Lab 1"),
          
          ("Thursday", "09:30", "11:00", 3, 4, "Room A"),
          ("Thursday", "11:00", "12:30", 5, 4, "Room A"),
          ("Thursday", "13:45", "15:15", 1, 4, "Room A"),
          ("Thursday", "15:15", "16:45", 2, 4, "Room A"),
          
          ("Friday", "09:30", "11:30", 7, 4, "Lab 2"),
          ("Friday", "13:45", "15:15", 4, 4, "Room A"),
          
          ("Saturday", "00:00", "04:00", 10, 4, "Room A")
      `);
  }

  console.log("Timetable initialized");
};

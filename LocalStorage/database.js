import * as SQLite from "expo-sqlite";

export const db_init = async () => {
  const db = await SQLite.openDatabaseAsync("localStorage");

  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS timetable (id INTEGER PRIMARY KEY AUTOINCREMENT, weekday TEXT, start_time TEXT, end_time TEXT, subject TEXT, semester INTEGER, teacher TEXT, classroom TEXT)"
  );
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, subject TEXT, status TEXT)"
  );

  const row = await db.getFirstAsync(
    "SELECT * FROM timetable WHERE semester=4"
  );
  if (!row) {
    await db.execAsync(`
        INSERT INTO timetable 
          (weekday, start_time, end_time, subject, semester, teacher, classroom) 
        VALUES
          ("Monday", "09:30", "11:00", "Software Engineering", 4, "TBD", "Room A"),
          ("Monday", "11:00", "12:30", "Business Economics & Financial Analysis", 4, "TBD", "Room A"),
          ("Monday", "13:45", "15:15", "Operating Systems", 4, "TBD", "Room A"),
          
          ("Tuesday", "09:30", "11:00", "Constitution Of India", 4, "TBD", "Room A"),
          ("Tuesday", "11:00", "12:30", "Discrete Mathematics", 4, "TBD", "Room A"),
          ("Tuesday", "13:45", "15:45", "Skills Development Lab", 4, "TBD", "Lab 1"),
          
          ("Wednesday", "09:30", "11:00", "Database Management System", 4, "TBD", "Room A"),
          ("Wednesday", "11:00", "12:30", "Constitution Of India", 4, "TBD", "Room A"),
          ("Wednesday", "13:45", "15:45", "DBMS Lab", 4, "TBD", "Lab 1"),
          
          ("Thursday", "09:30", "11:00", "Operating Systems", 4, "TBD", "Room A"),
          ("Thursday", "11:00", "12:30", "Software Engineering", 4, "TBD", "Room A"),
          ("Thursday", "13:45", "15:15", "Discrete Mathematics", 4, "TBD", "Room A"),
          ("Thursday", "15:15", "16:45", "Business Economics & Financial Analysis", 4, "TBD", "Room A"),
          
          ("Friday", "09:30", "11:30", "OS Lab", 4, "TBD", "Lab 2"),
          ("Friday", "13:45", "15:15", "Database Management System", 4, "TBD", "Room A"),
          
          ("Saturday", "00:00", "04:00", "RRP", 4, "TBD", "Room A")
      `);
  }
};

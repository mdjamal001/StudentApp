import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as SQLite from "expo-sqlite";
import { supabase } from "../utils/supabase";

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
  await db.execAsync(`DROP TABLE IF EXISTS syllabus`);
  await db.execAsync(`DROP TABLE IF EXISTS subjects`);
  await db.execAsync(`DROP TABLE IF EXISTS notifications`);
  await db.execAsync(`DROP TABLE IF EXISTS notiTemp`);
  

  await db.execAsync(`
    CREATE TABLE subjects (
      id INTEGER PRIMARY KEY,
      subject_name TEXT,
      subject_type TEXT,
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
  await db.execAsync(
    `CREATE TABLE syllabus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unit INTEGER,
      Etype TEXT,
      subject_id INTEGER,
      topic TEXT,
      status BOOLEAN DEFAULT false,
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )`
  );
  await db.execAsync(
    `CREATE TABLE notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      subject TEXT,
      sentdate DATE,
      sentHour INTEGER,
      info TEXT default NULL,
      status BOOLEAN DEFAULT false
    )`
  );
  await db.execAsync(
    `CREATE TABLE notiTemp (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      subject TEXT,
      sentdate DATE,
      sentHour INTEGER,
      info TEXT default NULL,
      status BOOLEAN DEFAULT false
    )`
  );
  //Make an API call to fetch data of timetable and subjects
  const {data:timetable,error:er} = 
    await supabase.from('timetable').select('*').eq('semester',parseInt(semester)).eq('branch',branch);
  if(er){
    console.log("error : "+er);
  }
   const {data:syllabus,error:err} = 
    await supabase.from('syllabus').select('*').eq('semester',parseInt(semester)).eq('branch',branch);
  if(err){
    console.log("error : "+err);
  }
  const {data:notifications,error:e} =
   await supabase.from('notifications').select('*').eq('semester',parseInt(semester)).eq('branch',branch).order('sentdate',{ascending:false});
  if(err){
    console.log("error : "+e);
  }
  const { data:subjects, error } = await supabase.rpc('get_subjects_by_branch_semester', {
  input_branch: branch,
  input_semester: parseInt(semester)
  });
  if(error){
    console.log("error: "+error.message);
  }
  
  for (let subject of subjects) {
    await db.execAsync(
      `INSERT INTO subjects (id, subject_name, subject_type, attendance_percent, semester, total_classes, attended_classes) VALUES (${subject.subject_id}, "${subject.subject_name}", "${subject.subject_type}", 0, ${semester}, 0, 0)`
    );
  }
  for (let noti of notifications) {
    await db.execAsync(
      `INSERT INTO notifications (id, title, subject, sentdate, info, sentHour) VALUES (${noti.id}, "${noti.title}", "${noti.subject}", "${noti.sentdate}", "${noti.info}",${noti.sentHour})`
    );
  }
  for (let syll of syllabus) {
    for(let ex in syll){
        if(ex=="mid1"||ex=="mid2"||ex=="sem"){
            for(let ele of syll[ex]){
                const {topics,unitNumber} =ele;
                for(let ent of topics){
                  await db.execAsync(
                  `INSERT INTO syllabus (unit, Etype, subject_id, topic) VALUES (${unitNumber}, "${ex}", ${syll.subject_id}, "${ent}")`
                  );
                }
           }
         }
           
    }
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
  const notiData = await db.getAllAsync(`SELECT * FROM notifications`);


  timetableData.forEach((classData) => {
    console.log(classData);
  });
  notiData.forEach((classData) => {
    console.log(classData);
  });
  
  
};

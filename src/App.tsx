import { useState } from "react";
import { getData } from "./db";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function App() {
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [grade, setGrade] = useState<null | ReturnType<typeof getData>[0]>(
    null
  );
  const [parent] = useAutoAnimate(/* optional config */);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "student-id") {
      setStudentId(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "course-number") {
      setCourseNumber(value);
    }
  }

  function handleSubmit() {
    const data = getData();
    const student = data.find((s) => s.student_id === studentId);
    if (!student) {
      alert("Student ID is not correct");
      return;
    }
    if (student.email.toLowerCase().trim() !== email.toLowerCase().trim()) {
      alert("Email is not correct");
      return;
    }
    if (courseNumber !== "255217") {
      alert("Course number is not correct");
      return;
    }
    setGrade(student);
  }

  function handleReset() {
    console.log("reset");
    setStudentId("");
    setEmail("");
    setCourseNumber("");
    setGrade(null);
  }

  return (
    <>
      <header className="container">
        <h1>Production Support 2566-2 Grade</h1>
      </header>
      <main className="container">
        <article>
          <label htmlFor="student-id">Student ID</label>
          <input
            type="number"
            name="student-id"
            onChange={handleChange}
            value={studentId}
          />
          <label htmlFor="email">CMU Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <label htmlFor="course-number">Course Number (6 digit)</label>
          <input
            type="number"
            name="course-number"
            onChange={handleChange}
            value={courseNumber}
          />
          <div role="group">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </article>

        <div ref={parent}>
          {grade && (
            <>
              <article>
                <pre>{JSON.stringify(grade, null, 8)}</pre>
              </article>
              <article>
                <h4>คำอธิบาย</h4>
                <ul>
                  <li>
                    คำนำหน้า <kbd>NR = อ.นิรันดร์</kbd>
                    {"  "}
                    <kbd>AC = อ.อนิรุท</kbd>
                    {"  "} <kbd>SR = อ.ศักดิ์เกษม</kbd>
                  </li>
                  <li>เลขในวงเล็บคือคะแนนดิบเต็ม</li>
                  <li>เลขในวงเล็บที่มี % คือ เปอร์เช็นต์ของคะแนนตัดเกรด</li>
                  <li>
                    <kbd>"NR - Class (5)": 4</kbd> แปลว่า คะแนนเข้าห้องเรียน
                    อ.นิรันดร์ เต็ม 5 เราได้ 4
                  </li>
                  <li>
                    <kbd>"NR - Class (%3)": 2.4</kbd> แปลว่า คะแนนเข้าห้องเรียน
                    อ.นิรันดร์ เต็ม 3% ของคะแนนเกรด เราทำให้ 2.4%
                  </li>
                </ul>
              </article>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;

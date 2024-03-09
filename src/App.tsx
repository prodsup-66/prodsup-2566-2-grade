import { useState } from "react";
import { data } from "./db";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function App() {
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [grade, setGrade] = useState<null | (typeof data)[0]>(null);
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
    <div className="container-fluid">
      <h1>Production Support 2566-2 Grade</h1>
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
        <label htmlFor="course-number">Course Number (ุ6 digit)</label>
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
          <article>
            <pre>{JSON.stringify(grade, null, 2)}</pre>
          </article>
        )}
      </div>
    </div>
  );
}

export default App;

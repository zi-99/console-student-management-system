
// ==========================================
// STUDENT MANAGEMENT & RESULTS ANALYSIS SYSTEM
// ==========================================

// 1. STUDENT CLASS
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  // Calculate average using reduce()
  getAverage() {
    const total = this.grades.reduce(
      (sum, grade) => sum + grade,
      0
    );

    return total / this.grades.length;
  }

  // Calculate letter grade
  getGrade(average) {
    if (average >= 90) return "A";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 45) return "D";
    else if (average >= 40) return "E";
    else return "F";
  }

  // Determine final result
  getResult(average) {
    if (average >= 50 && this.attendance >= 75) {
      return "Passed";
    } else {
      return "Needs Review";
    }
  }
}

// ==========================================
// 2. STUDENTS ARRAY
// ==========================================

const studentsList = [
  new Student(1, "Ahmed", [80, 85, 90], 90),
  new Student(2, "Sara", [40, 45, 50], 80),
  new Student(3, "Ali", [70, 65, 75], 60),
  new Student(4, "Mona", [90, 95, 85], 95)
];

// ==========================================
// 3. STUDENTS REPORT
// ==========================================

console.log("%c STUDENTS MANAGEMENT SYSTEM ",
  "background: #263238; color: #fff; font-size: 18px; padding: 10px;"
);

const studentsReport = studentsList.map((student) => {
  const average = student.getAverage();

  return {
    ID: student.id,
    Name: student.name,
    Grades: student.grades.join(" - "),
    Attendance: student.attendance + "%",
    Average: average.toFixed(2),
    Grade: student.getGrade(average),
    Result: student.getResult(average)
  };
});

console.group("STUDENTS REPORT");
console.table(studentsReport);
console.groupEnd();

// ==========================================
// 4. MERCY COMMITTEE
// ==========================================

// Filter students with averages between 40 and 49
const strugglingStudents = studentsList.filter((student) => {
  const average = student.getAverage();

  return average >= 40 && average <= 49;
});

// Add 5 mercy marks using map()
const mercyList = strugglingStudents.map((student) => {
  const oldAverage = student.getAverage();

  return {
    Name: student.name,
    OldAverage: oldAverage.toFixed(2),
    NewAverage: (oldAverage + 5).toFixed(2)
  };
});

// Display mercy committee report
console.group("MERCY COMMITTEE");

if (mercyList.length > 0) {
  console.table(mercyList);
} else {
  console.log("No students qualify for mercy marks.");
}

// Calculate total new averages using reduce()
const totalNewAverages = mercyList.reduce(
  (sum, student) => sum + Number(student.NewAverage),
  0
);

// Prevent division by zero
const mercyAverage =
  mercyList.length > 0
    ? totalNewAverages / mercyList.length
    : 0;

console.log(
  "%c New Average After Mercy: " + mercyAverage.toFixed(2),
  "color: #00897b; font-weight: bold; font-size: 14px;"
);

console.groupEnd();

// ==========================================
// 5. SUMMARY
// ==========================================

const passedCount = studentsList.filter((student) => {
  const average = student.getAverage();
  return student.getResult(average) === "Passed";
}).length;

const reviewCount = studentsList.length - passedCount;

console.group("FINAL SUMMARY");
console.table([
  { Metric: "Total Students", Value: studentsList.length },
  { Metric: "Passed Students", Value: passedCount },
  { Metric: "Needs Review", Value: reviewCount },
  { Metric: "Mercy Committee Members", Value: mercyList.length }
]);
console.groupEnd();

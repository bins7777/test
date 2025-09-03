class StudentModel {
  constructor() {
    this.students = [];
  }

  addStudent(student) {
    // check duplicate usernames
    if (this.students.find(s => s.username === student.username)) {
      throw new Error("Username already exists");
    }
    this.students.push(student);
    return student;
  }

  login(username, password) {
    const student = this.students.find(
      s => s.username === username && s.password === password
    );
    if (!student) {
      throw new Error("Invalid username or password");
    }
    return student;
  }
}

// import fs from 'fs';

// const content1 = "Line 1: Node.js is awesome!";
// const content2 = "\nLine 2: Learning File System today.";
// fs.writeFileSync('notes.txt',content1);
// console.log("content 1 is added")
// fs.appendFileSync('notes.txt',content2);
// const fileData = fs.readFileSync('notes.txt','utf-8');
// console.log(fileData);


// const students = [
//   { id: 1, name: "Umang", marks: 85 },
//   { id: 2, name: "Rohan", marks: 45 },
//   { id: 3, name: "Priya", marks: 92 }
// ];
// const st = JSON.stringify(students)
// fs.writeFileSync('student.json',st);

// const studentData = fs.readFileSync('student.json','utf-8');
// console.log(studentData);

// const fStudents = students.filter(students => students.marks > 90);

// console.log(fStudents);




// export default function logInfo(msg) {
  
//   const timestamp = new Date().toISOString();
//   const logMessage = `[${timestamp}] INFO: ${msg}\n`;

//   fs.appendFileSync('server.log', logMessage);
//   console.log("Logged:", logMessage);
// }

// export function logError(msg){
    
//     const timestamp = new Date().toISOString();
//     const logMessage = `[${timestamp}] INFO: ${msg}\n`;

//     fs.appendFileSync('server.log', logMessage);
//     console.log("Logged:", logMessage);
// }




// const check = fs.existsSync('todos.json')
// const todos = JSON.stringify([]);
// if(!check){
    
//     fs.writeFileSync('todos.json',todos);
//     console.log("created!")
// }

// const todoData = fs.readFileSync('todos.json','utf-8');


// const parsedTodo = JSON.parse(todoData);
// parsedTodo.push({ id: parsedTodo.length+1, task: "Learn Express.js", completed: false });

// const stringData = JSON.stringify(parsedTodo);
// fs.writeFileSync('todos.json',stringData)
// const todoData1 = fs.readFileSync('todos.json','utf-8');
// console.log(todoData1);

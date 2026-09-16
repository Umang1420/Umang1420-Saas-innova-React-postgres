import fs from 'fs'

const jsonData = [
    {
        id : '01',
        text: 'Learn JavaScript'
    },
     {
        id : '02',
        text: 'Learn Nest.js'
    },
     {
        id : '03',
        text: 'Learn TypeORM'
    }
]


fs.writeFileSync('notes.json',JSON.stringify(jsonData)); 
async function logFile() {
  try {
    const fileData = await fs.promises.readFile('notes.json','utf-8') // async way : this is will read file asynchronously , will not pause next execution if any
    const Object = JSON.parse(fileData)                   
    console.log(Object,"[async Way]");
  } catch {
    console.error("File is missing");
  }
}
logFile();


const fileData = fs.readFileSync('notes.json','utf-8')    // sync way : this is will pause the next execution until file creation happens 
const Object = JSON.parse(fileData)                             
console.log(Object,"[sync Way]");

for(let i=0;i<10;i++){
    console.log("Hello")
}


// in this example i have readed file in both way in async way even if you call logFile function before the loop but in output the loop will excutes first.
// and on the other side in sync way loop will execute after the file read where you call it 
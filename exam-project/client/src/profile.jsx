
export default function Profile({ person, personA, personB, personC }) {
  return (
    <>
    <div className="welcome">
    <p>Welcome, {person.name}!!</p>
    <p>Your Roll Number is {person.rollNumber}</p>
    </div>
    <div className="cards">
      <div className="card">
          <p>Name : {personA.name}</p>
          <p>Course: {personA.course}</p>
          <p>Batch: {personA.batch ? personA.batch : personA.batch = 2026}</p>
      </div>
      <div className="card">
          <p>Name : {personB.name}</p>
          <p>Course: {personB.course}</p>
          <p>Batch: {personB.batch ? personB.batch : personB.batch = 2026}</p>
      </div>
      <div className="card">
          <p>Name : {personC.name}</p>
          <p>Course: {personC.course}</p>
          <p>Batch: {personC.batch ? personC.batch : personC.batch = 2026}</p>
      </div>
    </div>
    </>
  );
}

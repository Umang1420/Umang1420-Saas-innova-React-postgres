import Profile from "./profile";
export default function Welcome() {
  return (
    <>
     <Profile
      person={{ name: 'Umang', rollNumber: 25 }}
      personA={{name:'Umang', course:'BCA'}}
      personB={{name:'Ankit', course:'MCA', batch:2025}}
      personC={{name:'Mehul', course:'BCA'}}
    />
    </>
  );
}

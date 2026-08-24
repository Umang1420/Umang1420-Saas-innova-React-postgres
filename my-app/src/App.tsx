import Greeting from "./greeting.jsx";
import FocusInput from "./FocusInput.jsx";
import Counter from "./Counter.jsx";
import Profile from "./profile.jsx";
import Color from "./color.jsx";
import Time from "./time.tsx";
import Input from "./input.tsx"
import Auto from "./autocounter.tsx"
import InputExample from "./textcount.tsx"
function App() {
  return (
    <>
      <Greeting name={"Umang"} />
      <FocusInput />
      <Counter />
      <Profile
        user={{
          name: "Umang",
          skill: "java,python,Javascript",
          bio: "A great Person",
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTprBYZbLD-x2RMRWGu_hJoXEZ5hqxj5PUKlqI9W4m0SOwR3s7Thg-MCOP3mNMORx8ZUZz42pgySlVzu5BX90LhiSV-aTDJMNzj_-v9IQiWTQ&s=10"}}/>
      <Color />
      < Time />
      <Input />
      <Auto />
      <InputExample />
    </>
  );
}

export default App;

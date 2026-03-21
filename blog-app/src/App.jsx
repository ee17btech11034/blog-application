import './App.css'

function App() {
  const new_var1 = import.meta.env.VITE_APPWRITE_URL;
  const new_var2 = import.meta.env.VITE_APPWRITE_URL2;
  console.log(new_var1);
  

  return (
    <>
      <div>Hi Raj, {new_var1}, {new_var2}</div>
    </>
  )
}

export default App

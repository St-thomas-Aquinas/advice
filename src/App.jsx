import { useEffect, useState } from "react";
import './APP.css'

function App() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => { 
    async function HandleAdvice() {
      setloading(true);
      try {
        const response = await fetch(`https://api.adviceslip.com/advice`);
        if (!response.ok) {
          setError("Something Went wrong");
          return;
        }
        const data = await response.json();
        const data2 = JSON.stringify(data.slip.advice);
        setPosts(data.slip.advice);
      } catch (e) {
        setError("Something Went Wrong");
      } finally {
        setloading(false);
      }
    }
HandleAdvice();
  }, []);
  return (
    <div>
      <>
        <h1>Welcome to Advice.com</h1>
        {loading && <h2>Loading Advice wait for a bit</h2>}
        {error && <h2>{error}</h2>}
        {posts && <h3>{posts}</h3>}
        <div>
      <button
        onClick={ async function(){setloading(true);
          try {
            const response = await fetch(`https://api.adviceslip.com/advice`);
            if (!response.ok) {
              setError("Something Went wrong");
              return;
            }
            const data = await response.json();
            const data2 = JSON.stringify(data);
            setPosts(data2);
          } catch (e) {
            setError("Something Went Wrong");
          } finally {
            setloading(false);
          }

        }}>
        Get advice
      </button>
    </div>
      </>
    </div>
  );
}

export default App;

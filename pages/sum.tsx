// import Add from "../components/add";
import { useState } from "react";
function Sum() {
  const [count, setCount] = useState(0);

  function add() {
    console.log(count);
    const addCount = count + 1;
    setCount(addCount);

    console.log(count);
  }
  function minus() {
    console.log(count);
    const minusCount = count - 1;
    setCount(minusCount);
    console.log(count);
  }
  return (
    <div>
      <p>{count}</p>
      <button onClick={minus}>-</button>
      <button onClick={add}>+</button>
    </div>
  );
}

export default Sum;

import { useState } from "react";
function Sum() {
  const [count, setCount] = useState(0);

  function add() {
    setCount((prevState) => prevState + 1);
  }
  function minus() {
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

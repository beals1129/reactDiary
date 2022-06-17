import { useEffect, useState } from "react";

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Mount!");
  }, []);
  //디펜던시 어레이 [] 빈배열 을 넣어주면 컴포넌트가 리랜더링 되지만 컨퍼런틀가 마운트 되는시점만

  useEffect(() => {
    console.log("Update");
  });
  // 컴포넌트가 업데이트 되는시기 state가 업데이트 되는 순간 useEffect로 디펜던시를 주지않으면 컴포넌트가 업데이트 될 떄마다 넣어준다.

  useEffect(() => {
    console.log("count Update : " + count);
    if (count >= 5) {
      console.log("count가 5가 넘었습니다. 0으로 리셋합니다.");
      setCount(0);
    }
  }, [count]);
  //즉 count가 업데이트 될때마다 useEffect가 작동된다.

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;

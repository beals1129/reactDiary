import React, { useEffect, useState } from "react";

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`uptade :: count : ${count}`);
  });
  return <div>{count}</div>;
});

const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`uptade :: text : ${text}`);
  });
  return <div>{text}</div>;
});

const OptimizeTest = () => {
  //컴포넌트 재사용 연습
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  //왜 2개 표기되죠? 오류오류 > 해결 > optimize 안이 아니라 밖에 만들어줬어야함
  return (
    <div>
      <h2>count</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <CountView count={count} />
      <div>
        <h2>text</h2>
        <input value={text} onChange={(e) => setText(e.target.value)}></input>
        <TextView text={text} />
      </div>
    </div>
  );
};

export default OptimizeTest;

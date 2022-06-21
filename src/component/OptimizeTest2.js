import React, { useEffect, useState } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count : ${count}`);
  });
  return <div> {count}</div>;
});
// 상태변화가 없음
const CounterB = React.memo(({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
});
// 상태변화가 있음 => rerandering 되고있음
// > obj(객체)는 얕은 비교를 하기 때문에 값이 바뀌지 않아도 상태변화가 일어난다.

//객체를 얕은 비교를 하지 않게 해주려면 areEqual 을 비교해주면된다.
const areEqul = (prevProps, nextProps) => {
  // return true; //이전 프롭스와 현재 프롭스가 같다 > 리렌더링 X
  // return false; //이전 프롭스와 현재가 다르다 > 리렌더링 일으킴

  //   if (prevProps.obj.count === nextProps.obj.count) {
  //     return true;
  //   } else {
  //     return false;}

  return prevProps.obj.count === nextProps.obj.count;
  //간단하게 사용하기
};
const MemoixedCounterB = React.memo(CounterB, areEqul);

const OptimizeTest2 = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div>
      <div>
        <h2>Counter A</h2>
        <button onClick={() => setCount(count)}>A button</button>
        <CounterA count={count} />
      </div>
      <div>
        <h2>CounterB</h2>
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B Button
        </button>
        <MemoixedCounterB obj={obj} />
      </div>
    </div>
  );
};

export default OptimizeTest2;

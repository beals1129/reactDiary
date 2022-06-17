import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("mount");

    return () => {
      //unmount 되는 시점
      console.log("unmount");
    };
  }, []); // 빈배열이면 mount 되는 순간 전달됨 return 값을 사용하면 unmount 시점에서 사용
  return <div>UnMount Testing Component</div>;
};

const Lifecycle2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  return (
    <div>
      <button onClick={toggle}>visible</button>
      {isVisible && <UnmountTest />}
      {/* true 이냐 아니냐를 따라 컴포넌트를 출력한다. */}
    </div>
  );
};

export default Lifecycle2;

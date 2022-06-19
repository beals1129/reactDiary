import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditer from "./component/DiaryEditer";
import DiaryList from "./component/DiaryList";
import Lifecycle from "./Lifecycle";
import Lifecycle2 from "./Lifecycle2";

// const dummyList = [
//   {
//       id : 1,
//       author : "류희경",
//       content : "하이 1",
//       excersise : "rowing",
//       created_date : new Date().getTime()
//   },
//   {
//     id : 2,
//     author : "가나다",
//     content : "하이 2",
//     excersise : "bup",
//     created_date : new Date().getTime()
//   },
//   {
//     id : 3,
//     author : "희경류",
//     content : "하이 3",
//     excersise : "boxjump",
//     created_date : new Date().getTime()
//   },
//   {
//     id : 3,
//     author : "하하호",
//     content : "하이 4",
//     excersise : "pullup",
//     created_date : new Date().getTime()
//   },
//   ]
function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);
  //변수처럼 사용하는 useReference

  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts").then(
      (res) => res.json()
    );
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.title,
        content: it.body,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };
  useEffect(() => {
    getData();
  }, []);
  const onCreate = (author, content, excersise) => {
    //일기데이터를 추가하는 함수
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      created_date,
      excersise,
      id: dataId.current, //0
    };
    dataId.current += 1;
    // 다음아이템은 0이아닌 1이어야하니까
    setData([newItem, ...data]);
    // newItem 이 뒤에있다면 뒤로 쌓이는 것이고 앞에있다면 앞으로 쌓임
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    //filter로 새로운 배열을 만들고 그 배열을 setData에 넣어준다.
    setData(newDiaryList);
  };

  const onEdit = (targetID, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetID ? { ...it, content: newContent } : it
      )
    );
  };
  // 수정완료하기
  // 매개 변수로 무엇을 어떻게 수정할지 받아와야한다.
  // 어떤 id 인지 , 어떤걸로 content를 변경할것인지.
  // 매개변수로 전달받은 id와 target id 가 일치하게 되면 (해당원소는 1개뿐이다) > 수정대상

  return (
    <div className="App">
      <Lifecycle2 />
      <Lifecycle />
      <DiaryEditer onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}
//git ignore 변경사항 commit test

export default App;

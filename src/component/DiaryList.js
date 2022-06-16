import React from 'react';
import DiaryItem from './DiaryItem';


const DiaryList = ({diaryList, onRemove, onEdit}) => {
    console.log(diaryList)

    return (
        <div className='DiaryList'>
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((item)=>(
                    // key 값 idx로 사용해도 되지만 삭제 추가할때의 id 값 수정에 오류가 날 수 있다.
                    <DiaryItem key={item.id} {...item} onRemove={onRemove} onEdit={onEdit}/>
                    //스프레드 연산자로 값 넘겨줌
                ))}
            </div>
        </div>
    );
};

//undefined 로 전달될 것 같은 props 를 전달하기 위해서는 defaultProps 를 사용
DiaryList.defaultProps = {
    diaryList:[]
}

export default DiaryList;
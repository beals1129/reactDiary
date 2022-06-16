import React, { useRef, useState } from 'react';

const DiaryItem = ({author, content, created_date, excersise, id,onRemove, onEdit}) => {
    

    const handleRemove  = () => {
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
            onRemove(id);
        }
    }

    //수정
    const [isEdit, setIsEdit] = useState(false);
    //isEdit값이 true라면 현재 수정중임으로 수정중작업을 랜더링
    const toggleIsEdit = () => {
        setIsEdit(!isEdit)
    }
    // 수정중이 false에서 true로 변경하는 토글함수
    const [localContent , setLocalContent] = useState(content);
    //input을 핸들링할 state

    const localContnetInput = useRef()
    //input length 확인해서 foucus 주기위해 ref 사용

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }
    // content 초기화 ( 수정 취소시에 value값 원상태로 돌려두기 )

    const handleEdit = () => {
        if (localContent.length < 5 ){
            localContnetInput.current.focus();
            return;
        } 
        if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)){
            onEdit(id, localContent);
            // app 에서 id랑 targetId 를 비교해주도록 확인했으니까.. 이걸 넘겨주어야함.
            toggleIsEdit(); //수정완료시 isEdit false로 변경
        }
       
    }
    //수정완료
    
    return (
        <div className='DiaryItem'>
            <div key = {id}> 
                <p>작성자 : {author}</p>
                <span>내용 : 
                    <div className='content'>
                        {isEdit ? <textarea ref={localContnetInput} value={localContent} onChange={(e)=> setLocalContent(e.target.value)} />: <>{content}</>}
                    </div>
                </span>
                <p>운동종목 : {excersise}</p>
                <span>작성시간 : {new Date(created_date).toLocaleString()}</span>
                
                {isEdit ? (
                <>
                    <button onClick={handleQuitEdit}>수정취소</button>
                    <button onClick={handleEdit}>저장</button>
                </>
                ) : (
                <>
                    <button onClick={handleRemove}>삭제</button>
                    <button onClick={toggleIsEdit}>수정</button>
                </>)
                }
                
            </div>
        </div>

    );
};

export default DiaryItem;
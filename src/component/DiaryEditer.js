import React, { useRef, useState } from 'react';
import './style.css'

const DiaryEditer = ({onCreate}) => {
    
    //focus
    const authorInput = useRef();
    const contentInput = useRef();

    // const [author, setAuthor] = useState('');
    // const [content, setContent] = useState('');
    // function changeName(e) {
    //     setAuthor(e.target.value);
    //     console.log(e.target.value);
    // }
    // function changeContent(e) {
    //     setContent(e.target.value);
    //     console.log(e.target.value);
    // }
    //위의 내용이 같으니 이것을 합쳐서 객체로 만들어줌

    const [state, setState] = useState({
        author:"",
        content:"",
        excersise: 'rowing',
    })

    // function ChangeAuthor(e){
    //     setState({
    //         ...state,
    //         author: e.target.value,
    //     })
    // }
    // function ChangeContent(e){
    //     setState({
    //         ...state,
    //         content: e.target.value,
    //     })
    // }
    //함수도 중복인 것을 단순화 시키기

    const handleChange = (e) => {
        console.log(e.target.name);
        setState({
            ...state,
            [e.target.name] : e.target.value, //중요
        })
    }

    const handleSubmit = () => {
        if(state.author.length < 1)  {
            alert('작성자는 최소 1글자 이상 입력해주세요.');
            authorInput.current.focus();
            // authorInput.current.addClass('.focusInput') 작동안함
            return;
        }
        if(state.content.length < 5) {
            alert('본문은 최소 5글자 이상 입력해주세요.');
            contentInput.current.focus();
            return; //진행 종료
        }
        onCreate(state.author, state.content , state.excersise);
        alert("저장이 완료되었습니다.")
        
        //데이터 초기화
        setState({
            author: "",
            content: "",
            excersise: "rowing",
        })
    }

    const addWod = () => {
        const selectNum = 1;
        document.getElementById('wobType').innerHTML+=`<div id="selectBox"><select name={$nub} value={state.excersise} onChange={handleChange}>`+
        '<option value={"rowing"}>로잉</option>'+
        '<option value={"bup"}>버피</option>'+
        '<option value={"boxjump"}>박점</option>'+
        '<option value={"pullup"}>턱걸이</option>'+
        '<option value={"pushup"}>팔굽혀펴기</option>'+
        '</select>'+
        '<button onClick={removeSelect}>X</button>'
        +'</div>'

        const removeSelect = (obj) => {
            console.log('실행');
            document.getElementById('selectBox').removeChild(obj.parentNode);
        }
    }

    return (
        <div className='DiaryEditor'>
            <h2>오늘의 운동 일기</h2>
            <div>
                <input ref={authorInput} name='author' value={state.author} onChange={handleChange}/>
            </div>
            <div>
                <textarea ref={contentInput} name='content' value={state.content} onChange={handleChange}/>
            </div>
            <div id='wobType'>
                <span >오늘의 운동:</span>
                <select name='excersise' value={state.excersise} onChange={handleChange}>
                    <option value={'rowing'}>로잉</option>
                    <option value={'bup'}>버피</option>
                    <option value={'boxjump'}>박점</option>
                    <option value={'pullup'}>턱걸이</option>
                    <option value={'pushup'}>팔굽혀펴기</option>
                </select>
            </div>
            <button onClick={addWod}>+ 운동추가하기</button>
            
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    );
};

export default DiaryEditer;
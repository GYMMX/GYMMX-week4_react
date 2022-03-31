import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addWordFB } from "./redux/modules/word";

function Publish() {
  const dispatch = useDispatch();
  const history = useHistory();
  const text = React.useRef(null);
  const mean = React.useRef(null);
  const ex = React.useRef(null);

  const addWordList = () => {
    dispatch(
      addWordFB({
        text: text.current.value,
        mean: mean.current.value,
        ex: ex.current.value,
        date: new Date(),
        completed: false,
      })
    );
    history.push("/");
  };
  return (
    <>
      <Box>
        <h2>등록하기 페이지</h2>
        <Input
          name="title"
          placeholder="새로운 단어를 적어주세요!"
          type="text"
          ref={text}
        ></Input>
        <Input
          name="mean"
          placeholder="어떤 의미인가요?"
          type="text"
          ref={mean}
        ></Input>
        <Input
          name="ex"
          placeholder="예시를 적어주세요!"
          type="text"
          ref={ex}
        ></Input>
        <Btn onClick={addWordList}>등록하기</Btn>
      </Box>
    </>
  );
}

const Box = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #ffdfde;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ffdfde;
  text-align: center;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 15px;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 10px;
  padding: 10px;
  border-radius: 15px;
  border-color: transparent;
  color: #ffdfde;
  background-color: #6a7ba2;
  width: 150px;
  height: 20px;
  font-size: 16px;
  cursor: pointer;
  font-family: "GangwonEdu_OTFBoldA";
`;

export default Publish;

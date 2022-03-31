import React from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { db } from "./firebase";
import { updateWordFB } from "./redux/modules/word";
import {
  addDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Modify() {
  let history = useHistory();
  let params = useParams();
  const word_index = params.index;
  const word_list = useSelector((state) => state.word.list);
  console.log(word_list);
  console.log(word_index);
  console.log(word_list[word_index]);
  const dispatch = useDispatch();

  React.useEffect(async () => {
    console.log(db);

    const docRef = doc(db, "word", "BsNWzwSBtoUt92wzpyOs");
    deleteDoc(docRef);
  }, []);

  return (
    <>
      <Box>
        <h2>수정페이지가 되고 싶은 상세페이지</h2>
        <h5>{word_list[word_index] ? word_list[word_index].text : ""}</h5>
        <hr />
        <h5>{word_list[word_index] ? word_list[word_index].mean : ""}</h5>
        <h5>{word_list[word_index] ? word_list[word_index].ex : ""}</h5>
        {/* <Btn
          onClick={() => {
            dispatch(updateWordFB(word_list[word_index].id));
          }}
        >
          수정하기
        </Btn> */}
        <Btn
          onClick={() => {
            history.push("/");
          }}
        >
          돌아가기
        </Btn>
      </Box>
    </>
  );
}

const Box = styled.div`
  max-width: 350px;
  min-height: 50px;
  background-color: #ffdfde;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ffdfde;
  text-align: center;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 15px;
  margin-bottom: 8px;
  border-color: transparent;
  color: white;
  background-color: #6a7ba2;
  width: 150px;
  height: 20px;
  font-size: 16px;
  cursor: pointer;
  font-family: "GangwonEdu_OTFBoldA";
  color: #ffdfde;
`;

export default Modify;

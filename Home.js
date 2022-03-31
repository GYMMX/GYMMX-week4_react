import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteWordFB, updateWord, updateWordFB } from "./redux/modules/word";
import { loadWordFB } from "./redux/modules/word";

function Home() {
  let params = useParams();
  const word_list = useSelector((state) => state.word.list);
  console.log(word_list);
  const word_index = params.index;
  // console.log(word_index);
  const history = useHistory();
  // state는 이 스토어가 가지고 있는 전체데이터,
  const data = useSelector((state) => state.word.list);
  console.log(data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadWordFB());
  }, []);

  return (
    <>
      <Wrap>
        {data.map((data, index) => {
          return (
            <div style={{ display: "flex" }} key={index}>
              <Box completed={data.completed}>
                <h3>{data.text}</h3>
                <hr />

                <h4>{data.mean}</h4>

                <h4>
                  <span style={{ color: "#6A7BA2" }}>{data.ex}</span>
                </h4>

                <Button>
                  <Btn
                    onClick={() => {
                      // dispatch(updateWord(index));
                      dispatch(updateWordFB(word_list[index].id));
                    }}
                  >
                    📌
                  </Btn>
                  <Btn
                    onClick={() => {
                      history.push("Modify/" + index);
                    }}
                  >
                    🖍
                  </Btn>

                  <Btn
                    onClick={() => {
                      dispatch(deleteWordFB(word_list[index].id));
                    }}
                  >
                    ❌
                  </Btn>
                </Button>
              </Box>
            </div>
          );
        })}
      </Wrap>

      <Write
        onClick={() => {
          history.push("/Publish");
        }}
      >
        ➕
      </Write>
    </>
  );
}

const Wrap = styled.div`
  margin: 20px auto 20px auto;
  /* height: 100%; */
  /* background: 
  background-size: cover; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  max-width: 1230px;
  width: 100%;
  /* min-width: 500px; */
  /* padding: 50px; */
`;

const Box = styled.div`
  /* min-width: 500px;
  max-width: 500px; */
  width: 350px;
  /* display: inline-block; */
  /* min-height: 10vh;  */
  /* height: 90%; */
  background-color: ${(props) => (props.completed ? "#ffdfde" : "white")};
  padding: 20px;
  /* margin: 10px auto; */
  border-radius: 5px;
  border: 2px solid #ffdfde;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Btn = styled.button`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
`;

const Button = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
`;

const Write = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #6a7ba2;
  border-color: transparent;
  border-radius: 100%;
  padding: 10px;
  font-size: 25px;
  cursor: pointer;
`;
export default Home;

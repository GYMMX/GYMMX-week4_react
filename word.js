// word.js
import { db } from "../../firebase";
import {
  addDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions생성
const LOAD = "word/LOAD";
const CREATE = "word/CREATE";
const DELETE = "word/DELETE";
const UPDATE = "word/UPDATE";

// 초기값 설정
const initialState = {
  list: [
    // "안녕",
    // "hi",
    // "nihao",
    // { text: "안녕", completed: false },
    // { text: "HELLO", completed: false },
    // { text: "ㅎ2", completed: false },
  ],
};

// Action Creators 액션 생성 함수
export function loadWord(word_list) {
  // console.log("로드", word_list);
  return { type: LOAD, word_list };
}

export function createWord(word) {
  // console.log("액션을 생성할거야");
  return { type: CREATE, word };
}

export function deleteWord(word_index) {
  // console.log("지울버킷인덱스", word_index);
  return { type: DELETE, word_index };
}
export function updateWord(word_index) {
  return { type: UPDATE, word_index };
}

//middlewares
export const loadWordFB = () => {
  return async function (dispatch) {
    const word_data = await getDocs(collection(db, "word"));
    // console.log(word_data);

    let word_list = [];
    word_data.forEach((b) => {
      // console.log(b.id, b.data());
      word_list.push({ id: b.id, ...b.data() });
    });
    // console.log(word_list);
    const date_word_list = word_list.sort((a, b) => {
      return b.date - a.date;
    });
    console.log(date_word_list);
    dispatch(loadWord(date_word_list));
  };
};

export const addWordFB = (word) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "word"), word);
    // const _word = await getDoc(docRef);
    const word_data = { id: docRef.id, ...word };
    // console.log(word_data);

    dispatch(createWord(word_data));
  };
};

export const updateWordFB = (word_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "word", word_id);
    (await getDoc(docRef)).data().completed === false
      ? updateDoc(docRef, { completed: true })
      : updateDoc(docRef, { completed: false });

    // console.log(getState().word);
    const _word_list = getState().word.list;
    const word_index = _word_list.findIndex((b) => {
      return b.id === word_id;
    });
    dispatch(updateWord(word_index));
  };
};

export const deleteWordFB = (word_id) => {
  return async function (dispatch, getState) {
    if (!word_id) {
      window.alert("아이디가 없네요😅");
      return;
    }
    const docRef = doc(db, "word", word_id);
    await deleteDoc(docRef);

    const _word_list = getState().word.list;
    const word_index = _word_list.findIndex((b) => {
      return b.id === word_id;
    });
    dispatch(deleteWord(word_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "word/LOAD": {
      return { list: action.word_list };
    }

    // case "word/CREATE": {
    //   console.log("이제 값을 바꿀거야");
    //   // 우리가 추가한 입력 배열을 리턴에 넣어줘야함. 똑같은 형태로..
    //   // 새로운 값을 붙여놔야함

    //   const new_word_list = [...state.list, action.word];
    //   return { list: new_word_list };
    // }

    case "word/UPDATE": {
      console.log("이제 완료할거야!");
      console.log(state, action);

      const new_word_list = state.list.map((l, idx) => {
        return action.word_index == idx
          ? l.completed !== true
            ? { ...l, completed: true }
            : { ...l, completed: false }
          : l;
      });
      console.log(new_word_list);
      return { list: new_word_list };
    }

    case "word/DELETE": {
      console.log(state, action);
      const new_word_list = state.list.filter((l, idx) => {
        // console.log(action.word_index !== idx, action.word_index, idx);
        return action.word_index !== idx;
      });
      return { list: new_word_list };
    }

    default:
      return state;
  }
}

import { createStore } from "redux";

const form = document.querySelector("form");
const input = form.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const initialState = [];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter((lists) => lists.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));

const dispatchAdd = (text) => store.dispatch({ type: ADD_TODO, text });
const dispatchDelete = (e) =>
  store.dispatch({ type: DELETE_TODO, id: parseInt(e.target.parentNode.id) });

const drawList = () => {
  const todoList = store.getState();
  ul.innerHTML = "";
  todoList.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDelete);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};
store.subscribe(drawList);

const onSubmit = (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  dispatchAdd(text);
};

form.addEventListener("submit", onSubmit);

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../hooks/custom/useModal";
import { useDeleteTodo, useUpdateTodo } from "../../hooks/query/todo";
import { Todo } from "../../types/todo";
import Modal from "../modal/Modal";
import TodoEdit from "./TodoEdit";

interface Props {
  todo: Todo;
}

function TodoTitle({ todo }: Props) {
  const {
    isModalOpen: isEditFormOpen,
    modalOpen: editFormOpen,
    modalClose: editFormClose,
  } = useModal();
  const { updateTodo } = useUpdateTodo({});
  const { deleteTodo } = useDeleteTodo();
  const navigate = useNavigate();
  const { "*": currentUrl } = useParams();

  // 투두 상세보기
  const navigateTodoInfo = () => {
    if (currentUrl === todo.id) {
      navigate("/");
    } else {
      navigate(`/${todo.id}`);
    }
  };

  // 투두 삭제 버튼 클릭
  const onTodoDeleteClick = async () => {
    deleteTodo.mutate(todo.id);
    currentUrl?.includes(todo.id) && navigate("/");
  };

  const onTodoDoneClick = () => {
    updateTodo.mutate({ ...todo, isDone: !todo.isDone });
  };

  return (
    <>
      <div className="w-full text-left text-base font-light leading-relaxed mt-0 mb-0 text-slate-600">
        <button onClick={onTodoDoneClick}></button>
        <span className="text-indigo-500">
          <i
            className={`cursor-pointer ${
              todo.isDone ? "fas fa-check-circle" : "far fa-circle"
            }`}
            onClick={onTodoDoneClick}
          ></i>
        </span>
        <span
          className={`ml-2 cursor-pointer hover:font-bold ${
            todo.isDone && "line-through"
          }`}
          onClick={navigateTodoInfo}
        >
          {todo.title}
        </span>
      </div>
      <div className="flex justify-end">
        <button
          className="mr-3 text-slate-500 hover:text-indigo-500"
          id="edit"
          onClick={editFormOpen}
        >
          <i className="fas fa-pen" id="edit"></i>
        </button>
        <button
          className="text-slate-500 hover:text-indigo-500"
          id="delete"
          onClick={onTodoDeleteClick}
        >
          <i className="fas fa-trash-alt" id="delete"></i>
        </button>
      </div>
      {isEditFormOpen && (
        <Modal>
          <TodoEdit todo={todo} editFormClose={editFormClose} />
        </Modal>
      )}
    </>
  );
}

export default TodoTitle;

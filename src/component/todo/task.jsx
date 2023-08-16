import React, { useState } from "react";
function Task({ taskData, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(taskData.todo);

  const handleEditSave = () => {
    onUpdate(taskData, "content", editedContent);
    setIsEditing(false);
  };

  return (
    <li className="todo">
      <input
        name=""
        type="checkbox"
        checked={taskData.isCompleted}
        onChange={() => onUpdate(taskData, "completion")}
      />
      {isEditing ? (
        <input
          className="item"
          data-testid="modify-input"
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <span className="item">{taskData.todo}</span>
      )}
      {isEditing ? (
        <div className="buttons">
          <button data-testid="submit-button" onClick={handleEditSave}>
            제출
          </button>
          <button
            data-testid="cancel-button"
            onClick={() => setIsEditing(false)}
          >
            취소
          </button>
        </div>
      ) : (
        <div className="buttons">
          <button
            data-testid="modify-button"
            onClick={() => setIsEditing(true)}
          >
            수정
          </button>
          <button
            data-testid="delete-button"
            onClick={() => onDelete(taskData.id)}
          >
            삭제
          </button>
        </div>
      )}
    </li>
  );
}

export default Task;

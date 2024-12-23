"use client";

import { ToDoItem } from "./ToDoItem";
import { useReadToDos } from "@/hooks/useReadToDos";
import { useWriteToDoContract } from "@/hooks/useWriteToDoContract";
import { useCallback, useState } from "react";
import { Button } from "./Button";

export const ToDoList = () => {
  const { toDos, isLoading: isLoadingToDos } = useReadToDos();
  const {
    handleCreateTask,
    completeTask,
    deleteTask,
    updateTaskName,
    isLoading,
  } = useWriteToDoContract();

  const [name, setName] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleCreateTask(name).then(() => {
        setName("");
      });
    },
    [handleCreateTask, name]
  );

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a new task..."
        />
        <Button type="submit" isLoading={isLoading || isLoadingToDos}>
          Create Task
        </Button>
      </form>

      <div className="flex flex-col gap-2">
        {toDos?.map((toDo, i) => (
          <ToDoItem
            key={toDo.name}
            id={i}
            text={toDo.name}
            isCompleted={toDo.isCompleted}
            onCompleteTask={completeTask}
            onEditName={updateTaskName}
            onDeleteTask={deleteTask}
            disabled={isLoading || isLoadingToDos}
          />
        ))}
      </div>
    </div>
  );
};

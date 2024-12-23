"use client";

import { PencilIcon, TrashIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { TransactionReceipt } from "viem";

export const ToDoItem = ({
  id,
  text,
  isCompleted,
  onCompleteTask,
  onEditName,
  onDeleteTask,
  disabled,
}: Readonly<{
  id: number;
  text: string;
  isCompleted: boolean;
  onCompleteTask: (id: number) => Promise<TransactionReceipt | undefined>;
  onEditName: (
    id: number,
    newText: string
  ) => Promise<TransactionReceipt | undefined>;
  onDeleteTask: (id: number) => Promise<TransactionReceipt | undefined>;
  disabled?: boolean;
}>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleSubmit = useCallback(() => {
    if (editedText.trim()) {
      if (editedText === text) {
        setIsEditing(false);
      } else {
        onEditName(id, editedText).then(() => {
          setIsEditing(false);
        });
      }
    }
  }, [id, editedText, onEditName, text]);

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={isCompleted ? undefined : () => onCompleteTask(id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        disabled={disabled}
        readOnly
      />

      {/* Todo Text / Edit Input */}
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="flex-1 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
          disabled={disabled}
        />
      ) : (
        <span
          className={`flex-1 ${
            isCompleted ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          {text}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {isEditing && (
          <>
            <button
              onClick={handleSubmit}
              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
              disabled={disabled}
            >
              <span>✓</span>
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
              disabled={disabled}
            >
              <XIcon className="size-3" />
            </button>
          </>
        )}
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
              disabled={disabled}
            >
              <PencilIcon className="size-3" />
            </button>
            <button
              onClick={() => onDeleteTask(id)}
              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
              disabled={disabled}
            >
              <TrashIcon className="size-3" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

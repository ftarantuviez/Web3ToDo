import { ToDoAbi } from "@/abis/ToDoAbi";
import { TO_DO_FUJI_ADDRESS } from "@/constants/addresses";
import { useCallback, useState } from "react";
import { waitForTransactionReceipt } from "viem/actions";
import { useWriteContract, useClient } from "wagmi";
import { WriteContractParameters } from "wagmi/actions";
import { useReadToDos } from "./useReadToDos";
import { toast } from "react-toastify";

export const useWriteToDoContract = () => {
  const { writeContractAsync, isPending: isWritePending } = useWriteContract();
  const client = useClient();
  const [loading, setLoading] = useState(false);
  const { refetch } = useReadToDos();

  const _handleWrite = useCallback(
    async (tx: WriteContractParameters) => {
      if (!client) return;
      try {
        setLoading(true);
        const hash = await writeContractAsync(tx);
        const receipt = await waitForTransactionReceipt(client, { hash });
        toast("Transaction successful", { type: "success" });
        await refetch();
        setLoading(false);
        return receipt;
      } catch (error) {
        setLoading(false);
        toast("Something went wrong", { type: "error" });
        throw error;
      }
    },
    [client, writeContractAsync, refetch]
  );

  const handleCreateTask = (name: string) => {
    return _handleWrite({
      abi: ToDoAbi,
      address: TO_DO_FUJI_ADDRESS,
      functionName: "createTask",
      args: [name],
    });
  };

  const updateTaskName = (id: number, name: string) => {
    return _handleWrite({
      abi: ToDoAbi,
      address: TO_DO_FUJI_ADDRESS,
      functionName: "updateTaskName",
      args: [id, name],
    });
  };

  const completeTask = (id: number) => {
    return _handleWrite({
      abi: ToDoAbi,
      address: TO_DO_FUJI_ADDRESS,
      functionName: "completeTask",
      args: [id],
    });
  };

  const deleteTask = (id: number) => {
    return _handleWrite({
      abi: ToDoAbi,
      address: TO_DO_FUJI_ADDRESS,
      functionName: "deleteTask",
      args: [id],
    });
  };

  return {
    handleCreateTask,
    updateTaskName,
    completeTask,
    deleteTask,
    isLoading: isWritePending || loading,
  };
};

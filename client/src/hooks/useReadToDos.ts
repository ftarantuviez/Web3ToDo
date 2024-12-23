import { ToDoAbi } from "@/abis/ToDoAbi";
import { TO_DO_FUJI_ADDRESS } from "@/constants/addresses";
import { ToDo } from "@/types/ToDo";
import { useAccount, useReadContract } from "wagmi";

/**
 * Custom hook to read all ToDo items for the connected wallet address
 * @returns Object containing:
 * - toDos: Array of ToDo items with name, completion status and creation timestamp
 * - Additional query metadata from useReadContract
 */

export const useReadToDos = () => {
  const { address } = useAccount();

  const { data, ...rest } = useReadContract({
    abi: ToDoAbi,
    address: TO_DO_FUJI_ADDRESS,
    args: [address],
    functionName: "getAllTasks",
    scopeKey: `read-to-dos-${address}`,
    query: {
      enabled: !!address,
    },
  });

  return { toDos: (data ?? []) as ReadonlyArray<ToDo>, ...rest };
};

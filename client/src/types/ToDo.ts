export type ToDo = Readonly<{
  name: string;
  isCompleted: boolean;
  createdAt: bigint;
}>;

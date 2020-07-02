export type Character = {
  letter: string;
  id: number | null;
};

export type Quote = {
  hash: string;
  name: string;
  text: string;
  context?: string;
  occupation?: string;
  time?: string;
};

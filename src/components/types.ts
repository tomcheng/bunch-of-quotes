export type Character = {
  letter: string;
  id?: number;
};

export type Quote = {
  hash: string;
  name: string;
  text: string;
  context?: string;
  occupation?: string;
  time?: string;
};

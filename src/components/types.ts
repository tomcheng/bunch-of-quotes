export type Character = {
  letter: string;
  id?: number;
};

export type Quote = {
  name: string;
  text: string;
  context?: string;
  occupation?: string;
  time?: string;
};

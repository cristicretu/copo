export interface MessageObject {
  id: string;
  message: string;
  clientName: string;
}

export enum Mode {
  work = "work",
  break = "break",
}

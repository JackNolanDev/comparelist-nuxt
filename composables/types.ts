export enum SupportedLists {
  HARDCOVER_FICTION = "hardcoverFiction",
  HARDCOVER_NONFICTION = "hardcoverNonfiction",
  PAPERBACK_FICTION = "paperbackFiction",
  PAPERBACK_NONFICTION = "paperbackNonfiction",
  MASS_MARKET = "massMarket",
  PICTURE_BOOK = "pictureBook",
  ADVICE = "advice"
}

export interface Book {
  title: string;
  author: string;
  publisher: string;
  desc?: string;
  image: string;
  rank: number;
  lastRank: number;
  wol: number
}

export interface BookList {
  name: string;
  date: string;
  rate: string;
  books: Book[]
}

export interface BookLists {
  [SupportedLists.HARDCOVER_FICTION]: BookList;
  [SupportedLists.HARDCOVER_NONFICTION]: BookList;
  [SupportedLists.PAPERBACK_FICTION]: BookList;
  [SupportedLists.PAPERBACK_NONFICTION]: BookList;
  [SupportedLists.MASS_MARKET]: BookList;
  [SupportedLists.PICTURE_BOOK]: BookList;
  [SupportedLists.ADVICE]: BookList;
}

export interface Source extends Partial<BookLists> {
  disp: string;
  
}

export interface CompareListData {
  nyt: Source;
  indie: Source;
  publishers: Source;
}

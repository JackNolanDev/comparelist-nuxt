import compareListData from "./data.json";
import type {CompareListData} from "./types";

export const useCompareListData = (): CompareListData => {
  return compareListData;
};
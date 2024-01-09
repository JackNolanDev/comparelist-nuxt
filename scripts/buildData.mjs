import { buildLists } from "./fetchCompareListData.mjs";
import fs from "fs";

const path = "./composables/data.json";

const writeLists = async () => {
  const lists = await buildLists();
  fs.writeFileSync(path, JSON.stringify(lists));
  console.log(`Finished writing to ${path}`);
};

writeLists();

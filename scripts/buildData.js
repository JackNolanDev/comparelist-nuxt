const jobs = require('./fetchCompareListData');
const fs = require('fs')

const path = "./composables/data.json"

const writeLists = async () => {
  const lists = {};
  await jobs.updateLists(lists);
  fs.writeFileSync(path, JSON.stringify(lists))
  console.log(`Finished writing to ${path}`)
}

writeLists()

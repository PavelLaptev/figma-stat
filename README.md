# Figma stats

Everyday at 6 am (UTC timezone) the github script captures all avalible Figma plugins and files.

All information is stored in a separate [github branch](https://github.com/PavelLaptev/figma-stat/tree/gh-pages) and divided into two folders — [plugins](https://github.com/PavelLaptev/figma-stat/tree/gh-pages/plugins) and [hub_files](https://github.com/PavelLaptev/figma-stat/tree/gh-pages/hub_files).

All data about your plugins also stored in a separate folder like `https://github.com/PavelLaptev/figma-stat/tree/gh-pages/plugins/your-plugin-id`.

Each folder contains:

- `info.json`
- `counters.json`
- `latest.json`
- `change.json.`

---

### [🕹️ DEMO](https://pavellaptev.github.io/get-figma-stat/)

---

## How to fetch data

```js
// Links to files
const fetchLinks = {
  info: `https://pavellaptev.github.io/figma-stat/plugins/1000012087652644703/info.json`,
  counters: `https://pavellaptev.github.io/figma-stat/plugins/1000012087652644703/counters.json`,
  latest: `https://pavellaptev.github.io/figma-stat/plugins/1000012087652644703/latest.json`,
  change: `https://pavellaptev.github.io/figma-stat/plugins/1000012087652644703/change.json`,
};

// Fetch certain data
const getCounters = async () => {
  await fetch(fetchLink.counters)
    .then((response) => response.json())
    .then((counter) => {
      console.log(counter);
    });
};

getCounters();

// Loop through all links
const getAllData = (links) => {
  Object.values(links).forEach(async (link, i) => {
    await fetch(link)
      .then((response) => response.json())
      .then((data) => {
        let fetchedData = { [Object.keys(links)[i]]: data };
        console.log(fetchedData);
      });
  });
};

getAllData(fetchLink);
```

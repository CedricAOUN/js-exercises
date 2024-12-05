// Basic Fetch
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

// Fetch all of the results and combine them into 1 array
async function fetchAllResults(url) {
  let allResults = [];

  async function fetchPage(url) {
    const response = await fetch(url);
    const data = await response.json();

    allResults = [...allResults, ...data.results];

    if (data.next) {
      await fetchPage(data.next); // recursively fetch results from pages
    }
  }

  await fetchPage(url);

  return allResults;
}
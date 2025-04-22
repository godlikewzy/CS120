document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('query').value;
    //empty check
    if (!query) return;
    try {
      const response = await fetch('/search?q=' + encodeURIComponent(query));
      const data = await response.json();
  
      if (data.error) {
        console.log('No result:', data.error);
      } else {
        console.log('Place:', data.place);
        console.log('Zip Codes:', data.zips.join(', '));
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  });
  
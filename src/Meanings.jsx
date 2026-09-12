import React, { useState, useEffect } from 'react';

function DataFetcher() {
  // 1. Declare state variables for data, loading, and error states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Use useEffect to run the fetch operation when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await fetch('https://typicode.com');
        
        // Check if the response is successful (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON data
        const result = await response.json();
        
        // Update data state
        setData(result);
      } catch (err) {
        // Handle any network or parsing errors
        setError(err.message);
      } finally {
        // Turn off the loading spinner regardless of success or failure
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs exactly once on mount

  // 3. Conditional rendering based on states
  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  // 4. Render the data using map()
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetcher;

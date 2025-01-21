import React, { useState } from "react";
import axios from "axios";

const LoadTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  // Send a GET request to the base API
  const sendRequest = async () => {
    try {
      const response = await axios.get("http://localhost:8000"); // Your base API
      setResponses((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  // Start the load test by sending 50 requests per second
  const startLoadTest = () => {
    setIsLoading(true);

    // Interval to send requests at 50 requests per second
    const interval = setInterval(() => {
      sendRequest();
    }, 20); // Every 20ms to simulate 50 requests per second

    // Stop after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
    }, 10000); // Run the test for 10 seconds
  };

  return (
    <div>
      <h2>API Load Test</h2>
      <button onClick={startLoadTest} disabled={isLoading}>
        {isLoading ? "Testing..." : "Start Load Test"}
      </button>

      <h3>Responses</h3>
      <pre>{JSON.stringify(responses, null, 2)}</pre>
    </div>
  );
};

export default LoadTest;

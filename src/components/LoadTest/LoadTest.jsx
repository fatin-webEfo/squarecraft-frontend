import { useState, useEffect } from "react";
import axios from "axios";

const LoadTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalRequests, setTotalRequests] = useState(0);
  const [status200Count, setStatus200Count] = useState(0);
  const [non200Count, setNon200Count] = useState(0);
  const [hitsToSend, setHitsToSend] = useState(500);
  const [testResults, setTestResults] = useState(null);

  const sendRequest = async () => {
    try {
      const response = await axios.get("http://localhost:8000");
      setTotalRequests((prev) => prev + 1);
      console.log(response.status)
      if (response.status === 200) {
        setStatus200Count((prev) => prev + 1);
      } else {
        setNon200Count((prev) => prev + 1);
        console.log(`Non-200 response: ${response.status}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      stopLoadTest(true);
    }
  };

  useEffect(() => {
    let requestInterval;
    let increaseInterval;

    if (isLoading) {
      requestInterval = setInterval(() => {
        sendRequest();
      }, 1000 / hitsToSend);

      increaseInterval = setInterval(() => {
        setHitsToSend((prev) => prev + 500);
      }, 1000);
    }

    return () => {
      clearInterval(requestInterval);
      clearInterval(increaseInterval);
    };
  }, []);

  const startLoadTest = () => {
    setIsLoading(true);
    setTestResults(null);
  };

  const stopLoadTest = (crashed = false) => {
    setIsLoading(false);
    setTestResults({
      totalRequests,
      status200Count,
      non200Count,
      status: crashed ? "Test stopped due to crash" : "Test completed successfully",
    });
  };

  return (
    <div className="pt-28 flex items-center justify-center flex-col">
      <button onClick={startLoadTest} disabled={isLoading}>
        {isLoading ? "Testing..." : "Start Load Test"}
      </button>
      <button onClick={() => stopLoadTest()} disabled={!isLoading} className="mt-2">
        Stop Test
      </button>
      <h3>Total Requests: {totalRequests}</h3>
      <h3>Status 200 Responses: {status200Count}</h3>
      <h3>Non-200 Responses: {non200Count}</h3>

      {testResults && (
        <div className="mt-4">
          <h3>{testResults.status}</h3>
          <p>Total Requests: {testResults.totalRequests}</p>
          <p>Status 200 Responses: {testResults.status200Count}</p>
          <p>Non-200 Responses: {testResults.non200Count}</p>
        </div>
      )}
    </div>
  );
};

export default LoadTest;

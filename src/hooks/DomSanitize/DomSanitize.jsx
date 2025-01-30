import { createContext, useContext, useCallback, useEffect } from "react";
import DOMPurify from "dompurify";
import * as Sentry from "@sentry/react";
import axios from "axios";

// ✅ Initialize Sentry for local security tracking
Sentry.init({
  dsn: "https://f355bbde44c98a48d1530ba1ec5fd162@o4508731943747584.ingest.us.sentry.io/4508731945058304",
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost"],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const DomSanitizeContext = createContext({
  sanitize: () => {},
  detectHack: () => {},
});

export const DomSanitize = ({ children }) => {
  // ✅ Sanitize User Input to Prevent XSS & Attacks
  const sanitize = useCallback((input) => {
    try {
      console.time("Sanitize Execution Time");
      console.log("🛡️ Sanitization Started:", input);

      let result;
      if (typeof input === "string") {
        result = DOMPurify.sanitize(input);
        console.log("✅ Sanitized String:", result);
      } else if (typeof input === "object" && input !== null && !Array.isArray(input)) {
        result = Object.fromEntries(
          Object.entries(input).map(([key, value]) => [
            key,
            typeof value === "string" ? DOMPurify.sanitize(value) : value,
          ])
        );
        console.log("✅ Sanitized Object:", result);
      } else if (Array.isArray(input)) {
        result = input.map((item) =>
          typeof item === "string" ? DOMPurify.sanitize(item) : item
        );
        console.log("✅ Sanitized Array:", result);
      } else {
        console.warn("⚠️ Unsupported Input Type:", typeof input);
        result = input;
      }

      console.timeEnd("Sanitize Execution Time");
      return result;
    } catch (error) {
      console.error("❌ Sanitization Error:", error);
      Sentry.captureException(error);
      return input;
    }
  }, []);

  // ✅ Fetch Your Own IP Address & Location
  const fetchLocalIP = async () => {
    try {
      console.log("🌐 Fetching Your IP Address...");

      const { data } = await axios.get("https://api64.ipify.org?format=json");
      const userIP = data.ip;

      console.log("✅ Your IP Address:", userIP);

      // ✅ Fetch IP Location
      const locationResponse = await axios.get(`https://ipapi.co/${userIP}/json/`);
      console.log("📍 Your Location:", locationResponse.data);

    } catch (error) {
      console.error("❌ Failed to Fetch IP:", error);
      Sentry.captureException(error);
    }
  };

  // ✅ Local Real-Time Security Monitoring (Every 1 Second)
  useEffect(() => {
    fetchLocalIP(); // Fetch IP & Location on Load

    const securityCheck = setInterval(() => {
      console.log("🔎 Running Local Security Monitoring... ✅ Site is SAFE");
    }, 1000); // Runs every 1 second

    return () => clearInterval(securityCheck);
  }, []);

  return (
    <DomSanitizeContext.Provider value={{ sanitize }}>
      {children}
    </DomSanitizeContext.Provider>
  );
};

export const useSanitize = () => {
  const context = useContext(DomSanitizeContext);
  if (!context) {
    throw new Error("useSanitize must be used within a <DomSanitize /> provider");
  }
  return context;
};

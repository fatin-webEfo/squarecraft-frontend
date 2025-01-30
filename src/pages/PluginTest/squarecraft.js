(async function loadSquareCraftPlugin() {
    console.log("✅ SquareCraft Plugin Loaded");

    // ✅ 1. Wait for Auth Data from React Context
    function waitForAuthData() {
        return new Promise((resolve) => {
            const checkAuth = setInterval(() => {
                if (window.authData?.token) {
                    clearInterval(checkAuth);
                    resolve(window.authData);
                }
            }, 500);
        });
    }

    const authData = await waitForAuthData();
    console.log("🔑 Auth Token from React Context:", authData?.token);

    if (!authData?.token) {
        console.warn("⚠️ Auth data not available in plugin, checking localStorage...");
    }

    // ✅ 2. Fallback: Check LocalStorage (if script loads after React)
    let token = authData?.token || localStorage.getItem("squarCraft_auth_token");
    if (!token) {
        console.warn("⚠️ No token found in localStorage either.");
    } else {
        console.log("✅ Token Retrieved:", token);
    }

    // ✅ 3. Listen for token updates via `postMessage`
    window.addEventListener("message", (event) => {
        if (event.origin !== "https://steady-cobbler-fd4750.netlify.app") return;
        if (event.data?.type === "squarCraft_user") {
            console.log("🔄 Token Updated from React:", event.data.payload);
            localStorage.setItem("squarCraft_auth_token", event.data.payload.squarCraft_auth_token);
        }
    });

    // ✅ 4. Now use the token for authentication
    async function fetchUserProfile() {
        try {
            const response = await fetch("https://webefo-backend.vercel.app/api/v1/get-userProfile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("✅ User Profile:", data);
            } else {
                console.warn("⚠️ Failed to fetch user profile:", await response.json());
            }
        } catch (error) {
            console.error("❌ Error fetching user profile:", error);
        }
    }

    fetchUserProfile();
})();

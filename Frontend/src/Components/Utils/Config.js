// export const backendUrl = "https://us-central1-mixjam-30173.cloudfunctions.net/api";

let backendUrl = "";

if (window.location.hostname === "localhost") {
  // Running locally, use Firebase Functions emulated backend
  backendUrl = "http://localhost:5001/mixjam-30173/us-central1/api";
} else {
  // Production
  backendUrl = "https://us-central1-mixjam-30173.cloudfunctions.net/api";
}

export { backendUrl };

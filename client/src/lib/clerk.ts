import { apiRequest } from "./queryClient";

// Add user ID to all API requests
apiRequest.defaults.headers = {
  ...apiRequest.defaults.headers,
  "x-user-id": "user_testing" // In real app, get from Clerk
};

import axios from 'axios';
import { getToken } from '../utils/auth.js';  // Function to get stored JWT token

export const updateUserTarget = async ({ targetWeight, height }) => {
  try {
    const token = getToken();
    const payload = {};

    if (targetWeight !== null && targetWeight !== undefined) payload.targetWeight = targetWeight;
    if (height !== null && height !== undefined) payload.height = height;

    const response = await axios.patch(
      'http://localhost:5000/api/auth/target',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // { message: ..., user: ... }
  } catch (error) {
    console.error('Failed to update user target:', error);
    throw error;
  }
};

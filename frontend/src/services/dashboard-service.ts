import httpInterceptor from "../shared/httpInterceptor";

export const liveStreams = async () => {
  try {
    const result = await httpInterceptor.get(
      "http://localhost:3000/dashboard/liveStreams"
    );
    return result;
  } catch (error) {
    throw error;
  }
};

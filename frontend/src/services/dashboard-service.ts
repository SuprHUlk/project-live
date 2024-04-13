import httpInterceptor from "../shared/httpInterceptor";

export const liveStreams = async (category: string) => {
  try {
    const result = await httpInterceptor.get(
      "http://localhost:3000/dashboard/liveStreams?category=" + category
    );
    return result.data.result;
  } catch (error) {
    throw error;
  }
};

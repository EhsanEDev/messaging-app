const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetcher<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T; status: number }> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      credentials: "include",
      ...options,
    });
    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    throw error;
  }
}

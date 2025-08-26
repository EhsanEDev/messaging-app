const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetcher<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

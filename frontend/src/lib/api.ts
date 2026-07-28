const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body:
      options.body !== undefined
        ? JSON.stringify(options.body)
        : undefined,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const error = await response.json();

      // Print the full backend error in the console
      console.error("Backend Error:", error);

      if (typeof error.detail === "string") {
        message = error.detail;
      } else if (Array.isArray(error.detail)) {
        message = error.detail
          .map(
            (item: {
              loc?: string[];
              msg?: string;
              type?: string;
            }) =>
              `${item.loc?.join(".") ?? ""}: ${
                item.msg ?? item.type ?? "Unknown error"
              }`
          )
          .join("\n");
      } else if (typeof error.message === "string") {
        message = error.message;
      } else {
        message = JSON.stringify(error, null, 2);
      }
    } catch {
      try {
        message = await response.text();
      } catch {
        message = "Unknown server error";
      }
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
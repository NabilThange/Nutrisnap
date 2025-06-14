export async function analyzeImageWithVisionAI(base64Image: string): Promise<string> {
  try {
    const response = await fetch("/api/analyze-food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Image }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch analysis result from API route");
    }

    return data.result;
  } catch (error) {
    console.error("Error communicating with /api/analyze-food:", error);
    return `Failed to analyze image: ${(error as Error).message || "Unknown error"}`;
  }
} 
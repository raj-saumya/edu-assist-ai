export type ConvoRequest = {
  question: string;
  subject: string;
  thread_id: string;
};

export type ConvoResponse = {
  status: number;
  message: {
    data: {
      thread_id: string;
      mlflow_run_id: string;
      model_repr: string;
      tag: string;
      response_type: string;
      response: string;
    };
  };
};

export const streamConvo = async (
  request: ConvoRequest,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/convo/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body");
    }

    const decoder = new TextDecoder();
    let buffer = "";
    let fullResponse = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        // Process any remaining buffer
        if (buffer.trim()) {
          processBuffer(buffer, fullResponse, onChunk);
        }
        onComplete();
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      // Try to process complete JSON objects (newline-delimited)
      const lines = buffer.split("\n");
      
      // Keep the last incomplete line in buffer
      buffer = lines.pop() || "";

      // Process complete lines
      for (const line of lines) {
        if (line.trim()) {
          const result = processBuffer(line, fullResponse, onChunk);
          if (result !== null) {
            fullResponse = result;
          }
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error : new Error("Unknown error"));
  }
};

// Helper function to process JSON buffer and extract response
function processBuffer(
  buffer: string,
  currentResponse: string,
  onChunk: (chunk: string) => void
): string | null {
  try {
    const jsonResponse: ConvoResponse = JSON.parse(buffer);
    const responseText = jsonResponse.message.data.response;
    
    // Accumulate the full response
    const newResponse = currentResponse + responseText;
    onChunk(newResponse);
    return newResponse;
  } catch (e) {
    // If not valid JSON, ignore
    return null;
  }
}

// Helper function to stream with dummy data for testing
export const streamConvoWithDummyData = async (
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
) => {
  const dummyRequest: ConvoRequest = {
    question: "What is the capital of France?",
    subject: "Geography",
    thread_id: "dummy-thread-123",
  };

  return streamConvo(dummyRequest, onChunk, onComplete, onError);
};


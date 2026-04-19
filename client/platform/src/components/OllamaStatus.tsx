import { useState, useEffect, useCallback } from "react";
import { checkOllamaHealth, fetchAvailableModels } from "../lib/ollamaClient";
import type { OllamaStatus } from "../lib/ollamaClient";

interface Props {
  onStatusChange?: (status: OllamaStatus, models: string[]) => void;
}

export default function OllamaStatus({ onStatusChange }: Props) {
  const [status, setStatus] = useState<OllamaStatus>("checking");
  const [models, setModels] = useState<string[]>([]);
  const [lastChecked, setLastChecked] = useState<string>("");

  const check = useCallback(async () => {
    try {
      setStatus("checking");

      const health = await checkOllamaHealth();
      const newStatus: OllamaStatus =
        health.status === "connected" ? "connected" : "disconnected";

      setStatus(newStatus);

      if (newStatus === "connected") {
        const m = await fetchAvailableModels();
        setModels(m);
        onStatusChange?.(newStatus, m);
      } else {
        setModels([]);
        onStatusChange?.(newStatus, []);
      }

      setLastChecked(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Ollama check failed:", err);
      setStatus("disconnected");
    }
  }, [onStatusChange]);

  useEffect(() => {
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, [check]);

  const dot =
    status === "connected"
      ? "bg-green-500"
      : status === "disconnected"
      ? "bg-red-500"
      : "bg-yellow-400 animate-pulse";

  const label =
    status === "connected"
      ? "Connected"
      : status === "disconnected"
      ? "Backend not connected"
      : "Checking...";

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
      <span className={`w-2 h-2 rounded-full ${dot}`} />

      <span className="text-gray-700 dark:text-gray-300 font-medium">
        {label}
      </span>

      {status === "connected" && models.length > 0 && (
        <span className="text-gray-400 text-xs">
          ({models.length} model{models.length > 1 ? "s" : ""})
        </span>
      )}

      {status === "disconnected" && (
        <>
          <button
            onClick={check}
            className="ml-1 text-xs text-blue-500 hover:text-blue-700 underline"
          >
            Retry
          </button>

          <div className="ml-2 text-xs text-gray-400">
            Run:{" "}
            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
              ollama serve
            </code>
          </div>
        </>
      )}
    </div>
  );
}
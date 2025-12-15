"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"]
];

function evaluate(expr: string): string {
  try {
    // eslint-disable-next-line no-eval
    const result = eval(expr);
    if (typeof result === "number" && isFinite(result)) {
      return result.toString();
    }
    return "Error";
  } catch {
    return "Error";
  }
}

export function OriginalPage() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleButtonClick = (val: string) => {
    if (val === "=") {
      const res = evaluate(expression);
      setResult(res);
      setExpression(res === "Error" ? "" : res);
    } else {
      if (result !== null) {
        setResult(null);
        setExpression(val.match(/[0-9.]/) ? val : result + val);
      } else {
        setExpression(expression + val);
      }
    }
  };

  const handleClear = () => {
    setExpression("");
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-100 to-green-100">
      <header className="w-full py-6 bg-gradient-to-r from-red-600 to-green-600 text-white shadow text-center text-2xl font-bold tracking-wide">
        Calculator
      </header>
      <main className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-xs p-6 shadow-lg rounded-xl bg-white border-2 border-green-500">
          <div className="mb-4">
            <Input
              className="text-right text-2xl font-mono bg-green-50 border-green-300 focus:ring-green-500 focus:border-green-500"
              value={expression}
              readOnly
              aria-label="Calculator display"
            />
            <div className={cn(
              "h-8 text-right text-lg font-mono mt-1",
              result === "Error" ? "text-red-600" : "text-green-700"
            )}>
              {result !== null ? result : "\u00A0"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {buttons.flat().map((btn, idx) => (
              <Button
                key={btn + idx}
                variant="outline"
                className={cn(
                  "h-12 text-xl font-bold border-2",
                  btn === "="
                    ? "bg-green-600 text-white border-green-700 hover:bg-green-700"
                    : btn.match(/[+\-*/]/)
                    ? "bg-red-600 text-white border-red-700 hover:bg-red-700"
                    : "bg-white text-green-900 border-green-300 hover:bg-green-100"
                )}
                onClick={() => handleButtonClick(btn)}
                aria-label={btn === "=" ? "Equals" : btn}
              >
                {btn}
              </Button>
            ))}
            <Button
              variant="outline"
              className="col-span-4 h-12 mt-2 bg-red-600 text-white border-red-700 hover:bg-red-700 text-lg font-bold"
              onClick={handleClear}
              aria-label="Clear"
            >
              C (Clear)
            </Button>
          </div>
        </Card>
      </main>
      <footer className="w-full py-4 text-center text-green-700 bg-green-50 border-t border-green-200 text-sm">
        &copy; {new Date().getFullYear()} Calculator App
      </footer>
    </div>
  );
}

export default function CombinedGenerated() {
  return <OriginalPage />;
}

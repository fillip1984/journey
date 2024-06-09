"use client";

import { MouseEvent, useState } from "react";

interface Avail {
  slot: number;
  hour: number;
  usage?: Usage;
}

interface Usage {
  name: string;
}

export default function HomePage() {
  const [avails, setAvails] = useState<Avail[]>([]);
  const [selectedActivity, setSelectedActivity] = useState("");

  const handleReset = () => {
    let hour = 12;
    const newValues = Array.from(Array(24)).map((_, i) => {
      const newValue = { slot: i, hour } as Avail;
      hour = hour >= 12 ? 1 : hour + 1;
      return newValue;
    });
    setAvails(newValues);
  };

  const handleApplyActivity = (a: Avail, e: MouseEvent<HTMLButtonElement>) => {
    // allows user to click and drag through to set multiple at once
    if (e.type === "mouseenter" && e.buttons === 0) {
      return;
    }

    const updates = avails.map((prev) =>
      prev.slot === a.slot
        ? { ...prev, usage: { name: selectedActivity } }
        : prev,
    );
    setAvails(updates);
  };

  const handleActivitySelect = (activity: string) => {
    if (selectedActivity === activity) {
      setSelectedActivity("");
    } else {
      setSelectedActivity(activity);
    }
  };

  return (
    <main className="container h-screen py-16">
      <div className="mb-4">
        <div className="flex items-center gap-1">
          <h3>Allocations</h3>
          <button
            onClick={handleReset}
            className="rounded bg-orange-500 px-4 py-2 text-xl"
          >
            Reset
          </button>
        </div>
        <p>{avails.filter((a) => a.usage?.name).length} allocated</p>
        <p>{avails.filter((a) => !a.usage?.name).length} unallocated</p>
      </div>

      <div>
        <h4>Monday</h4>
        <div className="grid grid-cols-12 gap-2">
          {avails.map((a) => (
            <button
              key={a.slot}
              type="button"
              onMouseDown={(e) => handleApplyActivity(a, e)}
              onMouseEnter={(e) => handleApplyActivity(a, e)}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${a.usage?.name === "sleep" ? "border-4 border-blue-800" : "border border-white"}`}
            >
              {a.hour}
            </button>
          ))}
        </div>
      </div>

      <div className="my-4">
        <h3>Palette</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleActivitySelect("sleep")}
            className={`rounded ${selectedActivity === "sleep" ? "bg-blue-800" : "border border-blue-800"}  px-4 py-2`}
          >
            Sleep
          </button>
          {avails.filter((a) => a.usage?.name === "sleep").length}
        </div>
      </div>
    </main>
  );
}

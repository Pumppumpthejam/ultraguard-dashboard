import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Label from "../components/ui/label";
import Select, {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

interface Shift {
  site: string;
  device: string;
  shifts: {
    type: string;
    start: string;
    end: string;
    duration: string;
    days: string[];
  }[];
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Shifts: React.FC = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [site, setSite] = useState("");
  const [device, setDevice] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const [nightStart, setNightStart] = useState("");
  const [nightEnd, setNightEnd] = useState("");
  const [duration, setDuration] = useState("");
  const [dayDays, setDayDays] = useState<string[]>([]);
  const [nightDays, setNightDays] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/devices").then((res) => setDevices(res.data));
  }, []);

  const toggleDay = (
    setDays: React.Dispatch<React.SetStateAction<string[]>>,
    days: string[],
    day: string
  ) => {
    setDays(days.includes(day) ? days.filter((d) => d !== day) : [...days, day]);
  };

  const saveShift = () => {
    const payload: Shift = {
      site,
      device,
      shifts: [
        {
          type: "Day",
          start: dayStart,
          end: dayEnd,
          duration,
          days: dayDays,
        },
        {
          type: "Night",
          start: nightStart,
          end: nightEnd,
          duration,
          days: nightDays,
        },
      ],
    };

    axios.post("/api/shifts", payload).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6">🕓 Guarding Shifts</h2>

      <div className="space-y-4 bg-[#0f172a] p-6 rounded-lg shadow-lg">
        <div>
          <Label>Site Name</Label>
          <Input value={site} onChange={(e) => setSite(e.target.value)} />
        </div>

        <div>
          <Label>Select Device</Label>
          <Select onValueChange={setDevice} value={device}>
            <SelectTrigger>
              <SelectValue placeholder="Select Device" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((d) => (
                <SelectItem key={d.imei} value={d.imei}>
                  {d.name} ({d.imei})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Day Shift */}
          <div>
            <h4 className="font-semibold mb-2">Day Shift</h4>
            <Label>Start Time</Label>
            <Input type="time" value={dayStart} onChange={(e) => setDayStart(e.target.value)} />
            <Label className="mt-2">End Time</Label>
            <Input type="time" value={dayEnd} onChange={(e) => setDayEnd(e.target.value)} />
            <Label className="mt-2">Active Days</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  className={`px-3 py-1 rounded text-sm ${
                    dayDays.includes(day) ? "bg-green-600" : "bg-gray-700"
                  }`}
                  onClick={() => toggleDay(setDayDays, dayDays, day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Night Shift */}
          <div>
            <h4 className="font-semibold mb-2">Night Shift</h4>
            <Label>Start Time</Label>
            <Input type="time" value={nightStart} onChange={(e) => setNightStart(e.target.value)} />
            <Label className="mt-2">End Time</Label>
            <Input type="time" value={nightEnd} onChange={(e) => setNightEnd(e.target.value)} />
            <Label className="mt-2">Active Days</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  className={`px-3 py-1 rounded text-sm ${
                    nightDays.includes(day) ? "bg-green-600" : "bg-gray-700"
                  }`}
                  onClick={() => toggleDay(setNightDays, nightDays, day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label>Patrol Duration (minutes)</Label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => window.location.reload()}>
            Cancel
          </Button>
          <Button onClick={saveShift}>Save Shift</Button>
        </div>
      </div>
    </div>
  );
};

export default Shifts;

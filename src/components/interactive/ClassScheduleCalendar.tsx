import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Calendar, Clock, Users, MapPin, Check, X } from "lucide-react";

interface ClassSession {
  id: string;
  name: string;
  type: "yoga" | "weight-lifting" | "core" | "flexibility";
  instructor: string;
  time: string;
  duration: string;
  spots: number;
  maxSpots: number;
  room: string;
}

interface DaySchedule {
  day: string;
  classes: ClassSession[];
}

const weekSchedule: DaySchedule[] = [
  {
    day: "Monday",
    classes: [
      { id: "mon-1", name: "Morning Yoga", type: "yoga", instructor: "Priya S.", time: "6:00 AM", duration: "60 min", spots: 8, maxSpots: 15, room: "Studio A" },
      { id: "mon-2", name: "Power Lifting", type: "weight-lifting", instructor: "Raj P.", time: "7:30 AM", duration: "75 min", spots: 3, maxSpots: 10, room: "Weight Room" },
      { id: "mon-3", name: "Core Blast", type: "core", instructor: "Amit K.", time: "6:00 PM", duration: "45 min", spots: 12, maxSpots: 20, room: "Studio B" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { id: "tue-1", name: "Flexibility Flow", type: "flexibility", instructor: "Priya S.", time: "6:30 AM", duration: "45 min", spots: 10, maxSpots: 15, room: "Studio A" },
      { id: "tue-2", name: "Heavy Weights", type: "weight-lifting", instructor: "Raj P.", time: "5:30 PM", duration: "90 min", spots: 5, maxSpots: 8, room: "Weight Room" },
      { id: "tue-3", name: "Evening Yoga", type: "yoga", instructor: "Meera J.", time: "7:30 PM", duration: "60 min", spots: 6, maxSpots: 15, room: "Studio A" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { id: "wed-1", name: "Sunrise Yoga", type: "yoga", instructor: "Priya S.", time: "5:30 AM", duration: "60 min", spots: 11, maxSpots: 15, room: "Studio A" },
      { id: "wed-2", name: "Core & Strength", type: "core", instructor: "Amit K.", time: "12:00 PM", duration: "45 min", spots: 15, maxSpots: 20, room: "Studio B" },
      { id: "wed-3", name: "Olympic Lifting", type: "weight-lifting", instructor: "Raj P.", time: "6:00 PM", duration: "90 min", spots: 2, maxSpots: 6, room: "Weight Room" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { id: "thu-1", name: "Morning Stretch", type: "flexibility", instructor: "Meera J.", time: "6:00 AM", duration: "45 min", spots: 9, maxSpots: 15, room: "Studio A" },
      { id: "thu-2", name: "Weight Training", type: "weight-lifting", instructor: "Raj P.", time: "7:00 AM", duration: "75 min", spots: 4, maxSpots: 10, room: "Weight Room" },
      { id: "thu-3", name: "Core Express", type: "core", instructor: "Amit K.", time: "7:00 PM", duration: "30 min", spots: 18, maxSpots: 25, room: "Studio B" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { id: "fri-1", name: "Power Yoga", type: "yoga", instructor: "Priya S.", time: "6:00 AM", duration: "75 min", spots: 7, maxSpots: 15, room: "Studio A" },
      { id: "fri-2", name: "Full Body Weights", type: "weight-lifting", instructor: "Raj P.", time: "5:00 PM", duration: "90 min", spots: 1, maxSpots: 8, room: "Weight Room" },
      { id: "fri-3", name: "Flexibility & Core", type: "flexibility", instructor: "Meera J.", time: "6:30 PM", duration: "60 min", spots: 13, maxSpots: 20, room: "Studio A" },
    ],
  },
  {
    day: "Saturday",
    classes: [
      { id: "sat-1", name: "Weekend Yoga", type: "yoga", instructor: "Priya S.", time: "8:00 AM", duration: "90 min", spots: 5, maxSpots: 20, room: "Studio A" },
      { id: "sat-2", name: "Strength Training", type: "weight-lifting", instructor: "Raj P.", time: "10:00 AM", duration: "75 min", spots: 6, maxSpots: 10, room: "Weight Room" },
      { id: "sat-3", name: "Core Challenge", type: "core", instructor: "Amit K.", time: "11:30 AM", duration: "45 min", spots: 14, maxSpots: 20, room: "Studio B" },
    ],
  },
  {
    day: "Sunday",
    classes: [
      { id: "sun-1", name: "Restorative Yoga", type: "yoga", instructor: "Meera J.", time: "9:00 AM", duration: "75 min", spots: 10, maxSpots: 15, room: "Studio A" },
      { id: "sun-2", name: "Stretching Session", type: "flexibility", instructor: "Priya S.", time: "11:00 AM", duration: "45 min", spots: 12, maxSpots: 15, room: "Studio A" },
    ],
  },
];

const typeColors: Record<string, string> = {
  yoga: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "weight-lifting": "bg-red-500/20 text-red-400 border-red-500/30",
  core: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  flexibility: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

interface Reservation {
  classId: string;
  className: string;
  day: string;
  time: string;
  reservedAt: string;
}

const ClassScheduleCalendar = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [reservations, setReservations] = useLocalStorage<Reservation[]>("pathan-class-reservations", []);

  const filters = [
    { id: "all", label: "All Classes" },
    { id: "yoga", label: "Yoga" },
    { id: "weight-lifting", label: "Weight Lifting" },
    { id: "core", label: "Core" },
    { id: "flexibility", label: "Flexibility" },
  ];

  const filteredSchedule = weekSchedule.map(day => ({
    ...day,
    classes: day.classes.filter(c => filter === "all" || c.type === filter),
  }));

  const handleReserve = (classSession: ClassSession, day: string) => {
    const reservation: Reservation = {
      classId: classSession.id,
      className: classSession.name,
      day,
      time: classSession.time,
      reservedAt: new Date().toISOString(),
    };
    setReservations(prev => [...prev, reservation]);
    setSelectedClass(null);
  };

  const isReserved = (classId: string) => {
    return reservations.some(r => r.classId === classId);
  };

  const cancelReservation = (classId: string) => {
    setReservations(prev => prev.filter(r => r.classId !== classId));
  };

  return (
    <>
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Class Schedule
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <Button
                  key={f.id}
                  variant={filter === f.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f.id)}
                  className="text-xs"
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSchedule.map((day) => (
              <div key={day.day}>
                <h4 className="font-bold text-sm text-muted-foreground mb-2">{day.day}</h4>
                {day.classes.length === 0 ? (
                  <p className="text-sm text-muted-foreground/60 italic">No classes matching filter</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {day.classes.map((classSession) => {
                      const reserved = isReserved(classSession.id);
                      return (
                        <motion.button
                          key={classSession.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedClass(classSession);
                            setSelectedDay(day.day);
                          }}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            reserved
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 bg-card/50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{classSession.name}</span>
                                {reserved && <Check className="w-4 h-4 text-primary" />}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {classSession.time} • {classSession.duration}
                              </div>
                            </div>
                            <Badge variant="outline" className={`text-xs ${typeColors[classSession.type]}`}>
                              {classSession.type.replace("-", " ")}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{classSession.instructor}</span>
                            <span className={classSession.spots <= 3 ? "text-destructive" : "text-muted-foreground"}>
                              {classSession.spots} spots left
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {reservations.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                Your Reservations ({reservations.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {reservations.map((res) => (
                  <Badge key={res.classId} variant="secondary" className="pl-3 pr-1 py-1">
                    {res.className} - {res.day} {res.time}
                    <button
                      onClick={() => cancelReservation(res.classId)}
                      className="ml-2 p-1 hover:bg-destructive/20 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedClass && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedClass.name}</DialogTitle>
                <DialogDescription>
                  {selectedDay} at {selectedClass.time}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedClass.instructor}</p>
                    <p className="text-sm text-muted-foreground">Instructor</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedClass.duration}</p>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedClass.room}</p>
                    <p className="text-sm text-muted-foreground">Location</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm">
                    <span className={selectedClass.spots <= 3 ? "text-destructive font-bold" : "text-foreground"}>
                      {selectedClass.spots}
                    </span>
                    <span className="text-muted-foreground"> of {selectedClass.maxSpots} spots available</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedClass(null)}>
                  Cancel
                </Button>
                {isReserved(selectedClass.id) ? (
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      cancelReservation(selectedClass.id);
                      setSelectedClass(null);
                    }}
                  >
                    Cancel Reservation
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    className="flex-1"
                    onClick={() => handleReserve(selectedClass, selectedDay)}
                    disabled={selectedClass.spots === 0}
                  >
                    Reserve Spot
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClassScheduleCalendar;

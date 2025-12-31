import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Target, Dumbbell, Scale, TrendingUp, Plus, RotateCcw } from "lucide-react";

interface UserProgress {
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
  workoutsLogged: number;
  workoutGoal: number;
  streak: number;
  lastUpdated: string;
}

const defaultProgress: UserProgress = {
  startWeight: 0,
  currentWeight: 0,
  goalWeight: 0,
  workoutsLogged: 0,
  workoutGoal: 20,
  streak: 0,
  lastUpdated: "",
};

const ProgressTracker = () => {
  const [progress, setProgress] = useLocalStorage<UserProgress>("pathan-progress", defaultProgress);
  const [isEditing, setIsEditing] = useState(progress.startWeight === 0);
  const [formData, setFormData] = useState({
    startWeight: progress.startWeight.toString(),
    currentWeight: progress.currentWeight.toString(),
    goalWeight: progress.goalWeight.toString(),
  });

  const handleSaveGoals = () => {
    setProgress({
      ...progress,
      startWeight: parseFloat(formData.startWeight) || 0,
      currentWeight: parseFloat(formData.currentWeight) || 0,
      goalWeight: parseFloat(formData.goalWeight) || 0,
      lastUpdated: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const logWorkout = () => {
    const today = new Date().toDateString();
    const lastUpdate = progress.lastUpdated ? new Date(progress.lastUpdated).toDateString() : "";
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    let newStreak = progress.streak;
    if (lastUpdate === yesterday) {
      newStreak = progress.streak + 1;
    } else if (lastUpdate !== today) {
      newStreak = 1;
    }

    setProgress({
      ...progress,
      workoutsLogged: progress.workoutsLogged + 1,
      streak: newStreak,
      lastUpdated: new Date().toISOString(),
    });
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    setFormData({ startWeight: "", currentWeight: "", goalWeight: "" });
    setIsEditing(true);
  };

  const weightProgress = () => {
    if (progress.startWeight === 0 || progress.goalWeight === 0) return 0;
    const total = Math.abs(progress.startWeight - progress.goalWeight);
    const current = Math.abs(progress.startWeight - progress.currentWeight);
    return Math.min(100, Math.round((current / total) * 100));
  };

  const workoutProgress = () => {
    return Math.min(100, Math.round((progress.workoutsLogged / progress.workoutGoal) * 100));
  };

  if (isEditing) {
    return (
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Start Your Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Set your fitness goals and we'll help you track your progress!
          </p>
          <div>
            <Label htmlFor="startWeight">Starting Weight (kg)</Label>
            <Input
              id="startWeight"
              type="number"
              placeholder="e.g., 80"
              value={formData.startWeight}
              onChange={(e) => setFormData({ ...formData, startWeight: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="currentWeight">Current Weight (kg)</Label>
            <Input
              id="currentWeight"
              type="number"
              placeholder="e.g., 78"
              value={formData.currentWeight}
              onChange={(e) => setFormData({ ...formData, currentWeight: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
            <Input
              id="goalWeight"
              type="number"
              placeholder="e.g., 70"
              value={formData.goalWeight}
              onChange={(e) => setFormData({ ...formData, goalWeight: e.target.value })}
              className="mt-1"
            />
          </div>
          <Button onClick={handleSaveGoals} variant="hero" className="w-full">
            Start Tracking
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Your Progress
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetProgress}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Streak Badge */}
        {progress.streak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center"
          >
            <div className="bg-gradient-to-r from-primary to-gold px-4 py-2 rounded-full">
              <span className="text-primary-foreground font-bold">
                🔥 {progress.streak} Day Streak!
              </span>
            </div>
          </motion.div>
        )}

        {/* Weight Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Weight Progress</span>
            </div>
            <span className="text-sm text-muted-foreground">{weightProgress()}%</span>
          </div>
          <Progress value={weightProgress()} className="h-3" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Start: {progress.startWeight}kg</span>
            <span className="font-bold text-foreground">Now: {progress.currentWeight}kg</span>
            <span>Goal: {progress.goalWeight}kg</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3"
            onClick={() => {
              const newWeight = prompt("Enter your current weight (kg):");
              if (newWeight) {
                setProgress({ ...progress, currentWeight: parseFloat(newWeight), lastUpdated: new Date().toISOString() });
              }
            }}
          >
            Update Weight
          </Button>
        </div>

        {/* Workout Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Monthly Workouts</span>
            </div>
            <span className="text-sm text-muted-foreground">{progress.workoutsLogged}/{progress.workoutGoal}</span>
          </div>
          <Progress value={workoutProgress()} className="h-3" />
          <div className="flex gap-2 mt-3">
            <Button variant="hero" size="sm" className="flex-1" onClick={logWorkout}>
              <Plus className="w-4 h-4 mr-1" />
              Log Workout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
          <div className="text-center">
            <motion.div
              key={progress.workoutsLogged}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-primary"
            >
              {progress.workoutsLogged}
            </motion.div>
            <span className="text-xs text-muted-foreground">Workouts</span>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {Math.abs(progress.startWeight - progress.currentWeight).toFixed(1)}
            </div>
            <span className="text-xs text-muted-foreground">kg {progress.currentWeight < progress.startWeight ? "Lost" : "Gained"}</span>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gold">
              {progress.streak}
            </div>
            <span className="text-xs text-muted-foreground">Day Streak</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;

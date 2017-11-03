import { Workout } from '../workout/workout';

export class History {
  id: number;
  profileId: number;
  workoutName: string;
  lengthInSeconds: number;
  pointsEarned: number;
  caloriesBurned: number;
  workoutDate: Date;
  workout: Workout;
}

export class HistoryRequest {
  id: number;
  profileId: number;
  workoutId: number;
  lengthInSeconds: number;
  workoutDate: Date;
}
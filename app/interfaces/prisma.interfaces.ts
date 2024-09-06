import { HoleScore, Scorecard } from "@prisma/client";

export interface scorecardWithHoleScores extends Scorecard {
  holeScores: HoleScore[];
}

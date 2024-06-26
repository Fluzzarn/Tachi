import {
	ChartDocument,
	ClassAchievementDocument,
	GoalDocument,
	GoalSubscriptionDocument,
	integer,
	QuestDocument,
	QuestSubscriptionDocument,
	ScoreDocument,
	SessionDocument,
	SongDocument,
} from "tachi-common";

export type ClumpedActivityScores = {
	type: "SCORES";
	scores: Array<ScoreDocument & { __related: { song: SongDocument; chart: ChartDocument } }>;
};

export type ClumpedActivitySession = {
	type: "SESSION";
} & SessionDocument;

export type ClumpedActivityClassAchievement = {
	type: "CLASS_ACHIEVEMENT";
} & ClassAchievementDocument;

export type ClumpedActivityGoalAchievement = {
	type: "GOAL_ACHIEVEMENTS";
	// redundant, but convenient.
	userID: integer;
	goals: Array<GoalSubscriptionDocument & { __related: { goal: GoalDocument } }>;
};

export type ClumpedActivityQuestAchievement = {
	type: "QUEST_ACHIEVEMENT";
	userID: integer;
	sub: QuestSubscriptionDocument;
	quest: QuestDocument;
};

export type ClumpedActivity = Array<
	| ClumpedActivitySession
	| ClumpedActivityScores
	| ClumpedActivityClassAchievement
	| ClumpedActivityQuestAchievement
	| ClumpedActivityGoalAchievement
>;

/**
 * A 'raw' quest document is one without goalID references -- that is -- they inline
 * what goals they have.
 *
 * This is convenient for editing and storing in localStorage so people can create their
 * own quests.
 */
export type RawQuestDocument = Omit<QuestDocument, "questData" | "questID"> & {
	rawQuestData: Array<RawQuestSection>;
};

export type RawQuestSection = {
	title: string;
	desc: string;
	rawGoals: Array<RawQuestGoal>;
};

export type RawQuestGoal = {
	goal: Pick<GoalDocument, "criteria" | "charts" | "name">;
	note?: string;
};

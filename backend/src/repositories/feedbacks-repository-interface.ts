export interface FeedbackCreationData {
  type: string;
  comment: string;
  screenshot?: string | null;
}

export interface FeedbackReturnData extends FeedbackCreationData {
  id: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreationData) => Promise<FeedbackReturnData>;
}

export interface ResponseAPI<Entity> {
  data: Entity;
}

export interface ResponseUpdate {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: number;
  upsertedCount: number;
  matchedCount: number;
}

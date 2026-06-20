export type ActionStateZodError = {
  field: PropertyKey[];
  message: string;
}[];

export interface ActionState<TState, TResponseError> {
  success: boolean;
  state: TState;
  error: null | ActionStateZodError | TResponseError;
}

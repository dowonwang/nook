import type { ActionState, ActionStateZodError } from './type';

export const actionStateBuilder = {
  success<TState, TResponseError = never>(
    state: TState,
  ): ActionState<TState, TResponseError> {
    return {
      success: true,
      error: null,
      state,
    };
  },

  error<TState, TResponseError = never>(
    state: TState,
    error: TResponseError | ActionStateZodError,
  ): ActionState<TState, TResponseError> {
    return {
      success: false,
      error,
      state,
    };
  },
};

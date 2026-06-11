interface ActionSuccess<T> {
  success: true;
  state: T;
  error: null;
}

interface ActionError<T, E> {
  success: false;
  state: T;
  error: ErrorValue<E>;
}

export interface ErrorValue<E> {
  code: string;
  details: E | null;
}

export const createActionStateBuilder = {
  success<T>(state: T): ActionSuccess<T> {
    return {
      success: true,
      error: null,
      state,
    };
  },
  error<T, E>(state: T, error?: ErrorValue<E>): ActionError<T, E> {
    return {
      success: false,
      error: error ? error : { code: 'Unknown Error', details: null },
      state,
    };
  },
};

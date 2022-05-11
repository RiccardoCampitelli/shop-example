import { useReducer, useCallback, useRef, useEffect } from "react";

export type Action<T> =
  | { type: "REQUEST" }
  | { type: "SUCCESS"; payload: T | null }
  | { type: "FAILURE"; payload: string };

export type Status =
  | "NOT_REQUESTED"
  | "LOADING"
  | "SUCCESS"
  | "ERROR";

export interface State<T> {
  result: T | null;
  error: string | null;
  loading: boolean;
  status: Status;
}


function reducer<T>(
  state: State<T>,
  action: Action<T>
): State<T> {
  switch (action.type) {
    case "REQUEST":
      return { ...state, loading: true, error: null, status: "LOADING" };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        status: "SUCCESS",
        result: action.payload,
      };
    case "FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        status: "ERROR",
      };
    default:
      return state;
  }
}

const INITIAL_STATE: State<never> = {
  status: "NOT_REQUESTED",
  loading: false,
  result: null,
  error: "",
};

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type AnyFunction = (...args: any[]) => any;

export function useAsyncCallback<
  Fn extends AnyFunction,
  TReturn extends ReturnType<Fn>
>(
  asyncCallback: Fn
): [
  State<Awaited<TReturn>>,
  (...args: Parameters<Fn>) => Promise<void>
] {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const dispatchIfMounted = (action: Action<unknown>) => {
    if (mountedRef.current === true) dispatch(action);
  };

  const execute = useCallback(
    async (...args: Parameters<Fn>) => {
      dispatchIfMounted({ type: "REQUEST" });
      try {
        const result = await asyncCallback(...args);

        dispatchIfMounted({ type: "SUCCESS", payload: result });
      } catch (error) {
        dispatchIfMounted({ type: "FAILURE", payload: error });
      }
    },
    [asyncCallback]
  );

  return [state as State<Awaited<TReturn>>, execute];
}

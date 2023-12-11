import { SWRGlobalState } from "./global-state";
import type { Cache, State } from "internal/types";

export const createCacheHelper = (
  cache: Cache,
  key: string
): {
  getCache: () => State;
  setCache: (value: State) => void;
} => {
  const { setter } = SWRGlobalState.get(cache);

  return {
    getCache: () => cache.get(key) || {},
    setCache: (value: State) => {
      if (!key) return;

      const prev = cache.get(key);
      const merge = { ...prev, ...value };

      setter(key, merge, prev);
    },
  };
};

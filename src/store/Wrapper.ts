import type { StateCreator, StoreMutatorIdentifier} from "zustand/vanilla";
import { create } from "zustand/index";
import { devtools, persist } from "zustand/middleware";
import { PersistOptions } from "zustand/middleware/persist";
import { DevtoolsOptions } from "zustand/middleware/devtools";

interface WrapperConfig<T> {
  persist?: Omit<PersistOptions<T, T>, "name">;
  devTools?: Omit<DevtoolsOptions, "name">;
}

export const WrapperSlice =
  <T,V extends [StoreMutatorIdentifier, unknown][] = []>
    (name: string, initialized: StateCreator<T, [],V>, config?: WrapperConfig<T>) => {
  const devMode = false; //TODO: get from build env
  config = {
    persist: config?.persist || {},
    devTools: config?.devTools || {},
  }

  const storeBuildByDefault = persist(
    initialized, { name, ...config.persist }
  )

  const storeResolvedWithConditional = devMode
      ? create(devtools(storeBuildByDefault, { name, ...config.devTools }))
      : create(storeBuildByDefault);

  return storeResolvedWithConditional;
}

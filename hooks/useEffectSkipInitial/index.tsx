import { DependencyList, useEffect, useRef } from "react";

type EffectFunction = () => void;

function useEffectSkipInitial(
  effect: EffectFunction,
  dependencies: DependencyList
) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      effect();
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export default useEffectSkipInitial;

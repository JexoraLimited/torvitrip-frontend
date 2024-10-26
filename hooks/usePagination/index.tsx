import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import useEffectSkipInitial from "../useEffectSkipInitial";

const usePagination = (
  limitOptions: number[] = [10, 25, 50],
  {
    router = undefined,
    type = "route",
  }: { router?: NextRouter | undefined; type?: "route" | "state" } = {}
) => {
  if (type === "route") {
    const r = useRouter();
    const _router = router || r;
    const page = +(_router.query.page || 1);
    const limit = +(_router.query.limit || limitOptions[0]);
    const setSearchQueries = (key: string, value: number) => {
      _router.query[key] = String(value);
      _router.push(_router, undefined, { scroll: false });
    };
    const setPage = (page: number) => {
      if (page > 0) {
        setSearchQueries("page", page);
      }
    };
    const setLimit = (limit: number) => {
      if (limit > 0) {
        setSearchQueries("limit", limit);
      }
    };
    useEffectSkipInitial(() => {
      if (!_router?.query?.page) {
        setSearchQueries("page", 1);
      }
      if (!limitOptions.includes(Number(_router?.query?.limit))) {
        setSearchQueries("limit", limitOptions[0]);
      }
    }, [page, limit]);
    return { page, limit, offset: (page - 1) * limit, setPage, setLimit };
  } else {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(limitOptions[0]);

    return { page, limit, offset: (page - 1) * limit, setPage, setLimit };
  }
};

export default usePagination;

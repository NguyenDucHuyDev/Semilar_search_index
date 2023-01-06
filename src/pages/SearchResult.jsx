import React, { useEffect, useRef, useState } from "react";
import { memo } from "react";

const SearchResult = (props) => {
  console.log("SearchResult");
  const {
    isLoading,
    dataSearch,
    resultSearch,
    modeSearch,
    setSearchParams,
    handleChangeSearch,
    paramsPage,
  } = props;

  const [countPages, setCountPage] = useState([]);

  let arrPageNew = [];

  const paging = dataSearch.meta.total_page || 0;

  useEffect(() => {
    for (let i = 1; i < paging; i++) {
      arrPageNew.push({ id: i });
    }
    setCountPage(arrPageNew);
  }, [paging]);

  return (
    <div className="SearchResult">
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              width="36"
              height="36"
              fill="#fff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin w-8 h-8"
            >
              <path
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                opacity=".25"
              />
              <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
            </svg>
          </div>
        </div>
      )}
      <div className="py-5">
        <div className="w-5/6 mx-auto">
          <div className="w-3/6 flex flex-col gap-5 w-full overflow-y-auto">
            {dataSearch.data.map((data) => {
              return (
                <div className="showResult">
                  <pre className="text-sm text-gray-500	">
                    https://translate.google.com.vn
                  </pre>
                  <div className="text-xl text-indigo-300	">{data.title}</div>
                  <div className="text-zinc-500">{data.description}</div>
                </div>
              );
            })}

            {countPages && (
              <>
                <div className="flex">Phân Trang</div>
                <div className="flex justify-center gap-5 self-start text-center">
                  {countPages.map((countPage) => {
                    return (
                      <div key={countPage.id} className="">
                        {paramsPage != countPage.id ? (
                          <button
                            type="button"
                            name="pageSearch"
                            onChange={handleChangeSearch}
                            className=" text-white cursor-pointer"
                            onClick={() => {
                              setSearchParams({
                                q: resultSearch,
                                page: countPage.id,
                                mode: modeSearch,
                              });
                            }}
                          >
                            {countPage.id}
                          </button>
                        ) : (
                          <button
                            type="button"
                            name="pageSearch"
                            onChange={handleChangeSearch}
                            className="text-sky-400 cursor-pointer"
                            onClick={() => {
                              setSearchParams({
                                q: resultSearch,
                                page: countPage.id,
                                mode: modeSearch,
                              });
                            }}
                          >
                            {countPage.id}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchResult);

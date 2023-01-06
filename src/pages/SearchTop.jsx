import React, { useEffect, useRef, useState } from "react";
import {
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import iconSearch from "../assets/image/iconSearch.png";
import notFound from "../assets/image/notFound.gif";
import SearchResult from "../pages/SearchResult";

const SearchTop = () => {
  console.log("SearchTop");
  const [searchParams, setSearchParams] = useSearchParams({});
  const paramsQ = searchParams.get('q')
  const paramsPage = searchParams.get('page')
  const paramsMode = searchParams.get('mode')

  const [dataSearch, setDataSearch] = useState({});
  const checkDataEmpty = dataSearch?.data || [];
  console.log(dataSearch)
  const { search } = useLocation();
  const BASE_URL = import.meta.env.VITE_TEST_VAR_API_BASE_URL;
  const urlSearch = `${BASE_URL}/v1/search`;

  const inputSearch = useRef({
    resultSearch: paramsQ || "",
    pageSearch: paramsPage || 1,
    modeSearch: paramsMode || "quick",
  });

  const [isLoading, setLoading] = useState(false)

  const choices = [
    { id: 1, text: "Chọn chế độ quick", value: "quick", checked: "quick" },
    { id: 2, text: "Chọn chế độ normal", value: "normal", checked: "normal" },
    { id: 3, text: "Chọn chế độ deep", value: "deep",checked: "deep" },
  ];

  // Khi onChange vào handleChangeSearch
  const handleChangeSearch = (e) => {
    console.log("1")
    const name = e.target.name;
    const value = e.target.value;
    inputSearch.current = { ...inputSearch.current, [name]: value };
  };

  // Gửi submit lên
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      q: inputSearch.current.resultSearch,
      page: inputSearch.current.pageSearch,
      mode: inputSearch.current.modeSearch ,
    });
  };

  useEffect(() => {
    // const params = Object.fromEntries(new URLSearchParams(search))
    const endPoint = new URL(urlSearch);
    endPoint.search = new URLSearchParams(search).toString();

    setLoading(true)
    fetch(endPoint.href, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDataSearch(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      });
  }, [paramsQ, paramsPage, paramsMode]
  );

  return (
    <div className="SearchTop">
      <div className="overflow-y-auto">
        <div className="h-[137px]">
          <div className="fixed top-0 left-0 right-0 z-50 bg-black">
            <form
              className="flex flex-col justify-center items-center py-5 gap-5"
              onSubmit={handleSubmitSearch}
            >
              <div className="border-solid rounded-full border-2 border-slate-300 w-2/4 text-black bg-white">
                <img
                  src={iconSearch}
                  className="w-5 h-5 absolute translate-y-2/4 translate-x-2/4"
                />
                <input
                  type="text"
                  placeholder="Nhập tìm kiếm của bạn..."
                  className="p-2 pl-10 outline-0 w-full bg-transparent"
                  name="resultSearch"
                  onChange={handleChangeSearch}
                  defaultValue={inputSearch.current.resultSearch}
                />
              </div>
              <div className="flex gap-5 items-center">
                <div>Chọn chế độ: </div>
                {choices.map((choice) => {
                  return (
                    <label key={choice.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="modeSearch"
                        onChange={handleChangeSearch}
                        value={choice.value}
                        defaultChecked={choice.checked === paramsMode || false}
                        onClick={()=>{
                          setSearchParams({
                            q: inputSearch.current.resultSearch,
                            page: inputSearch.current.pageSearch,
                            mode: choice.value,
                          });
                        }}
                      />
                      <span className="ml-3">{choice.text}</span>
                    </label>
                  );
                })}
              </div>
            </form>
            <hr className="border-slate-300 mt-2" />
          </div>
        </div>
        {checkDataEmpty.length === 0 ? (
          <div className="showArrEmpty flex justify-center">
            <img src={notFound} width="450" height="450" />
          </div>
        ) : (
          <div className="showArrCurrent">
            <SearchResult 
              dataSearch={dataSearch}
              isLoading={isLoading}
              resultSearch={inputSearch.current.resultSearch}
              modeSearch={inputSearch.current.modeSearch}
              paramsPage={paramsPage}
              setSearchParams={setSearchParams}
              handleChangeSearch={handleChangeSearch}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTop;

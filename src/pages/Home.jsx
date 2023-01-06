import React, { useRef } from 'react'
import imageHome from '../assets/image/iconHome.gif'
import iconSearch from '../assets/image/iconSearch.png'
import {useNavigate, Outlet } from 'react-router-dom';

const Home = () => {
  console.log("Home")

  const navigate = useNavigate()

  const inputSearch = useRef({
    resultSearch:"",
    modeSearch:"quick",
  })

  const choices =  [
    {id:1, text:"Chọn chế độ quick", value:"quick", checked: true},
    {id:2, text:"Chọn chế độ normal", value:"normal"},
    {id:3, text:"Chọn chế độ deep", value:"deep"},
  ]

  const handleChangeSearch = (e) =>{
        const name = e.target.name;
        const value = e.target.value
        inputSearch.current = {...inputSearch.current,[name]:value}
    }

  const handleSubmitSearch = (event) => {
    event.preventDefault()   
    const pathSearch = { 
        q : inputSearch.current.resultSearch ,
        page: 1,
        mode:  inputSearch.current.modeSearch
    }

    navigate({ pathname: "/search", search: new URLSearchParams(pathSearch).toString() })
 
  }

  return (
    <div className='Home'>
        <div className='w-5/6 mx-auto'>
            <form 
                className='search flex flex-col justify-center py-2 items-center gap-3'
                onSubmit={handleSubmitSearch}
            >
                <img src={imageHome} className='w-96 h-96' />
                <div className='border-solid rounded-full border-2 border-slate-300 w-2/4 text-black bg-white'>
                    <img src={iconSearch} className='w-5 h-5 absolute translate-y-2/4 translate-x-2/4' />
                    <input 
                        type="text" 
                        placeholder='Nhập tìm kiếm của bạn...'
                        className='p-2 pl-10 outline-0 w-full bg-transparent'
                        name="resultSearch" 
                        onChange={handleChangeSearch}
                        value={inputSearch?.current?.resultSearch || undefined}
                    />
                </div>
                <div className='flex gap-5 items-center'>
                    <div>Chọn chế độ: </div>
                    {choices.map((choice) => {
                        return(
                            <label key={choice.id} className='cursor-pointer'>
                                <input 
                                    type="radio" 
                                    name="modeSearch"
                                    onChange = {handleChangeSearch}
                                    value = {choice.value}
                                    defaultChecked={ choice.checked || false }
                                />
                                <span className='ml-3'>{choice.text}</span>   
                            </label>
                        )    
                    })}
                </div>
                    <button 
                        type="submit"
                        className='border-2 border-slate-300 px-5 py-2 bg-emerald-800 mt-10' 
                    >Tìm kiếm</button>
            </form>
            <Outlet />
        </div>
    </div>
  )
}

export default Home
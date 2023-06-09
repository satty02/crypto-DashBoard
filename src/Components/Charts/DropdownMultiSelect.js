// this Component is used to select or search coin which is to display

import {useEffect, useState,useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {coinSelectionAction} from '../../State/Action';

const DropdownMultiSelect = () => {
    const selectedOptions = useSelector(state => state.coinSelect);
    const [searchedCoin,setSearchedCoin] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch()

    let options = useSelector(state => state.coinsData);

    const onSearch =(e)=>{
        setSearchedCoin(e.target.value);
    }

    let filteredOption = Array.isArray(options)
    ? options.filter((coin) => coin.id === searchedCoin)
    : [];

  if (filteredOption.length !== 0) {
    options = filteredOption;
  }


    const handleOptionChange = (option) => {
        const updatedOptions = [...selectedOptions];
        const optionIndex = updatedOptions.indexOf(option);

        if (optionIndex > -1) {
            updatedOptions.splice(optionIndex, 1);
        } else {

            updatedOptions.push(option);

        }
        return updatedOptions
    };

    // to hide list when click from anywhere

    const handleClickOutside = (evt)=>{
        if(dropdownRef.current && !dropdownRef.current.contains(evt.target)){
            setDropdownOpen(false)
        }
    }

    useEffect(()=>{
        document.addEventListener('click',handleClickOutside);
        return ()=>{
            document.removeEventListener('click',handleClickOutside)
        };
    },[])

    return (
        <div className="relative" ref={dropdownRef}>
            {/* button created  */}
            <button type="button" className={`py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white flex items-center justify-between w-full ${selectedOptions.length!==0?'bg-blue-300':'hover:border-sky-600'} `}
                onClick={
                    () => setDropdownOpen(!dropdownOpen)
            }>
                <span> {
                    selectedOptions.length === 0 ? 'SELECT COINS' : `${
                        selectedOptions.join(', ')
                    } selected`
                } </span>

                {/* Down arrow */}
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.293 8.293a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" clipRule="evenodd"/>
                </svg>
            </button>

            {/* dropdown list of coins */}

            {
            dropdownOpen && (
                <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg overflow-y-auto max-h-[40vh]">
                    <ul className="py-1">
                        <li><input className=' h-[1.7rem] w-full border-2 rounded-md '
                                    placeholder='  Search'
                                    value={searchedCoin}
                                    onChange={onSearch}/>
                                    
                        </li>
                        {
                        options.map((option) => (
                            <li key={
                                    option.id
                                }
                                className="relative px-2 py-1">
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600"
                                        checked={
                                            selectedOptions.includes(option.id)
                                        }
                                        onChange={
                                            () => dispatch(coinSelectionAction(handleOptionChange(option.id)))
                                        }/>
                                    <span className="ml-2 text-gray-700 ">
                                        {
                                        option.id
                                    }</span>
                                </label>
                            </li>
                        ))
                    } </ul>
                </div>
            )
        } </div>
    )
};

export default DropdownMultiSelect;

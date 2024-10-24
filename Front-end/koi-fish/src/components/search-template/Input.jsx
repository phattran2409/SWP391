import { useState } from "react"
import { FaSearch } from "react-icons/fa";

const Input = ({ onChangeCallback }) => {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue)
        onChangeCallback && onChangeCallback(inputValue)
    }

    return (
        <div className="relative w-full min-w-[300px]">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
            <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border-2 border-black rounded-2xl outline outline-2 outline-white "
                value={value}
                onChange={handleChange}
                placeholder="Type to search"
            />
        </div>

    )
}

export default Input
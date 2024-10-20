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
        <div className="flex">
            <FaSearch />

            <input
                type="text"
                className="w-full min-w-[300px] p-2 rounded-2xl px-4 relative border-e-4"
                value={value}
                onChange={handleChange}
                placeholder='Type to search'
            />

        </div>

    )
}

export default Input
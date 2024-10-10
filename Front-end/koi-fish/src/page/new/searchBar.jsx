// import { FaSearch } from "react-icons/fa"
// import { useState } from "react"
// import { json } from "react-router-dom";

// export const SearchBar = () => {
//     const [input, setInput] = useState("");

//     const fetchData = (value) => {
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then((response) => response.json())
//             .then((json) => {
//                 const results = json.filter((user) => {
//                     return user && user.name && user.name.toLowerCase().includes(value);
//                 });
//                 console.log(results)
//             });

//     };

//     const handleChange = (value) => {
//         setInput(value);
//         fetchData(value);

//     };
//     return (
//         <div className='flex w-full py-0 px-4 items-center border rounded-xl h-10 bg-white '>
//             <FaSearch />
//             <input placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)} />
//         </div>
//     )
// }

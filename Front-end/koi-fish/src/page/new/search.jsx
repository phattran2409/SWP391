import { useState, useEffect } from 'react';
import Input from '../../components/search-template/Input';
import ItemsList from '../../components/search-template/ItemsList';

export default function Search() {
    const [filteredItems, setFilteredItems] = useState([]);
    const [apiItems, setApiItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch Users
    useEffect(() => {
        fetch(`http://localhost:8081/v1/post/searchPostnotPagination/?categoryID=1&postStatus=true`)
            .then(response => response.json())
            .then(data => {
                setApiItems(data.datas);
                setFilteredItems(data.datas);
            })
            .catch(err => {
                console.log(err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filterItems = (searchTerm) => {
        setSearchTerm(searchTerm);
        const filterItems = apiItems.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filterItems.slice(0, 5));
    };

    return (
        <div className='w-full'>
            <Input onChangeCallback={filterItems} />
            {loading && <p>Loading...</p>}
            {error && <p>There was an error loading the items</p>}
            {!loading && !error && searchTerm && (
                <div className='bg-white p-4 rounded-b-2xl shadow-xl  '><ItemsList items={filteredItems} /></div>
            )}
        </div>
    );
}

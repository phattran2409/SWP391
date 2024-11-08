import { Link } from 'react-router-dom';

const ItemsList = ({ items }) => {
    return (
        <>
            {items.length === 0
                ? <p>No articles found</p>
                : <ul>
                    {items.map(item => <li key={item.id}>
                        <a href={`/details/${item._id}`}>{item.title}</a>
                    </li>)}
                </ul>
            }
        </>
    )
}

export default ItemsList;

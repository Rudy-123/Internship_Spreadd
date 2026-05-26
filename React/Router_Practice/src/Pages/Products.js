//shows the list of the products 
import { useSearchParams } from 'react-router-dom';
export default function Products(){
    const [searchParams,setSearchParams]=useSearchParams();
    const sort=searchParams.get('sort') || 'name';
    const category=searchParams.get('category') || 'all';
    const products = [
        { id: 1, name: 'Laptop', category: 'electronics', price: 50000 },
        { id: 2, name: 'Book', category: 'books', price: 300 },
        { id: 3, name: 'Phone', category: 'electronics', price: 30000 },
        { id: 4, name: 'Pen', category: 'stationery', price: 10 },
    ];
    let filtered = products;
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (sort === 'price') {
    filtered = filtered.sort((a, b) => a.price - b.price);
  }
  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>

      {/* Filter buttons - click करने से URL change होगी */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setSearchParams({ sort: 'name', category: 'all' })}
          style={{ marginRight: '10px', padding: '8px 12px', cursor: 'pointer' }}
        >
          All Products
        </button>
        <button 
          onClick={() => setSearchParams({ sort: 'price', category: 'electronics' })}
          style={{ marginRight: '10px', padding: '8px 12px', cursor: 'pointer' }}
        >
          Electronics (By Price)
        </button>
        <button 
          onClick={() => setSearchParams({ sort: 'name', category: 'books' })}
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Books
        </button>
      </div>

      <p>Current Filter: Category = {category}, Sort = {sort}</p>

      <ul>
        {filtered.map(product => (
          <li key={product.id}>
            {product.name} - ₹{product.price} ({product.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
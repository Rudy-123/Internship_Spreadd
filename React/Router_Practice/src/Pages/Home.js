import {Link} from 'react-router-dom';
export default function Home(){
    const posts=[
        {id:1, title:'React Basics',desc: 'Learn React fundamentals'},
        {id:2, title:'Routing Guide', desc: 'Master React Router' },
        {id:3, title:'useEffect Hook', desc: 'Understand side effects' },
    ];
    return (
        <div style={{ padding: '20px' }}>
        <h1>My Blog</h1>
        <p>Welcome! Check out my posts below:</p>

        <div style={{ display: 'grid', gap: '15px' }}>
          {posts.map(post => (
            <div 
              key={post.id} 
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                borderRadius: '5px',
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <Link to={`/post/${post.id}`}>
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
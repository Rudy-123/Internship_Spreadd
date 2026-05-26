//shows the details of any page 
import {useParams,useNavigate} from 'react-router-dom';
export default function PostDetail(){
    const {id}=useParams();
    const navigate=useNavigate();
    const posts = {
        1: { 
          title: 'React Basics', 
          content: 'React is a JavaScript library for building user interfaces with components.' 
        },
        2: { 
          title: 'Routing Guide', 
          content: 'React Router helps you navigate between pages without full page reload.' 
        },
        3: { 
          title: 'useEffect Hook', 
          content: 'useEffect lets you perform side effects in functional components.' 
        },
      };
    const post=posts[id];
    if(!post){
        return <div>Post Not Found !</div>
    }return (
        <div style={{ padding: '20px', maxWidth: '600px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              padding: '8px 12px',
              marginBottom: '20px',
              cursor: 'pointer',
            }}
          >
          </button>
    
          <h1>{post.title}</h1>
          <p>{post.content}</p>
    
          <hr />
          <p><strong>Post ID:</strong> {id}</p>
        </div>
      );
    }
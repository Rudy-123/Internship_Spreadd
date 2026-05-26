import {useEffect,useState} from 'react';
function UserProfile({userId}){
    const [user,setUser]=useState(null);//stores the fetch user data
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    useEffect(()=>{
        //Flag to prevent state updates if component unmounts
        let isMounted = true;
        async function fetchUserData(){
            try{
                setLoading(true);
                setError(null);
                const response=await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                if(!response.ok){
                    throw new Error(`HTTP Error ! status:${response.status}`);
                }
                const data=await response.json();
                if(isMounted){
                    setUser(data);
                }
            }catch(err){
                if(isMounted){
                    setError(err.message);
                }
            }finally{
                if(isMounted){
                    setLoading(false);
                }
            }
        }
        fetchUserData();

        return ()=>{
            isMounted=false;
        };
    },[userId]);
    if(loading){return <div>Loading...</div>;}
    if(error){return <div>Error: {error}</div>;} 
    if(!user){return <div>No User Found</div>;}
    return (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
        </div>
    );
}
export default function App() {
  const [userId, setUserId] = useState(1);

  return (
      <div style={{padding: '20px'}}>
          <h2>User Profile</h2>
          <button onClick={() => setUserId(1)}>User 1</button>
          <button onClick={() => setUserId(2)} style={{marginLeft: '10px'}}>User 2</button>
          <button onClick={() => setUserId(3)} style={{marginLeft: '10px'}}>User 3</button>
          <hr />
          <UserProfile userId={userId} />
      </div>
  );
}
import React,{useState} from 'react';
import Spinner from "./Spinner"; //for the loading animation
function AnswerForm(){
    const [answer,setAnswer]=useState('');//for updating the fields if answered by the user then yes
    const [status,setStatus]=useState('typing');
    const [error,setError]=useState(null);

    async function submithandler(e){
        e.preventDefault();
        setStatus('submitting')
        setError(null)
        try{    
            //fetch is the calling of the API, endpoint is of json server and await is for waiting for the resposne
            const response=await fetch('http://localhost:3001/posts',{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({
                    title:answer,
                    author:'Rudra',
                    id:Date.now()
                })
            });
            if(response.ok){
                setStatus('success');
                setAnswer('');
            }else{
                throw new Error('Failed to submit');
            }
        }catch(err){
            setStatus('error');
            setError(err.message);
        }
    }
    return (
        <div style={{padding:'20px',fontFamily:'Arial'}}>
          <h2>Submit Your Answer</h2>
    
          {status==='success' && (
            <div style={{color:'green',fontSize:'18px'}}>
              Thank You! Your answer has been submitted.
            </div>
          )}
          {status!=='success'&&(
            <form onSubmit={submithandler}>
              <input
                type="text"
                value={answer}
                onChange={(e)=>setAnswer(e.target.value)}
                placeholder="Type your answer..."
                disabled={status==='submitting'}
                style={{
                  padding: '10px',
                  width: '100%',
                  marginBottom: '10px',
                  opacity:status==='submitting'?0.5:1
                }}
              />
              <button
                disabled={!answer.trim()||status==='submitting'}
                type="submit"
                style={{
                  padding:'10px 20px',
                  opacity:!answer.trim()||status==='submitting'?0.5:1,
                  cursor:!answer.trim()||status==='submitting'?'not-allowed':'pointer'
                }}
              >
                {status==='submitting'?'Submitting...':'Submit'}
              </button>
              {status==='submitting'&&(
                <div style={{marginTop:'10px'}}>
                  <Spinner />Loading...
                </div>
              )}
              {status==='error'&& (
                <p style={{color:'red',marginTop:'10px'}}>
                  Error:{error}
                </p>
              )}
            </form>
          )}
        </div>
      );
    }
    export default AnswerForm;
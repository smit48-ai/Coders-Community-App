import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import '../components/Markdownrender.css';

const Markdownrender = (props) => {
    const renderers = {
        code: ({ node, ...props }) => (
          <div style={{width:"95%", overflow:"scroll", fontSize:"1rem", borderRadius:"10px", backgroundColor:"black", padding:"10px", margin:"auto"}}>
              <pre>
                <code style={{color:"white"}} {...props}/>
              </pre>
          </div>
        ),
      };
  return (
    <ReactMarkdown style={{fontSize:"1rem"}} components={renderers}>{props.content}</ReactMarkdown>
  )
}

export default Markdownrender
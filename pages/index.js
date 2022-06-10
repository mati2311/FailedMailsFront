import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
export default function Home() {
  
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://127.0.0.1:8000/mails')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  function updateTable(){
    setLoading(true)
    fetch('http://127.0.0.1:8000/mails',{method:'POST'})
      .then(() =>{fetch('http://127.0.0.1:8000/mails')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })} 
      )
    
  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    
    <div>
      <button type='button' onClick={updateTable}>
        Refresh Table
      </button>
      <table className='mailsTable'>
        <thead>
          <tr>
            <th>
              Email Id
            </th>
            <th>
            Rejected Contact
            </th>
            <th>
            Subject
            </th>
          </tr>
          
        </thead>
        <tbody>
          {data.map(function(mail, i){
              return <tr key={mail.Id}>
                
                <td>{mail.gmail_id}</td>
                
                <td>{mail.To}</td>
                <td>{mail.Subject}</td>
                
                    </tr>
          })}
        </tbody>
      </table>
    </div>
    

  
  )
  
}

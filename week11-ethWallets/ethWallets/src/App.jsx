import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'

async function getter() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const response = await data.json();
  return response;
}

const queryClient = new QueryClient();


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  )
}

export default App


function Posts() {
  const queryClient = useQueryClient();
  const { data, isLoading , error } = useQuery({ queryKey: ['todos'], queryFn: getter, refetchInterval: 1000 }); 

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )

}
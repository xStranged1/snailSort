//import { useState } from 'react'
import './App.css'

const matrix = [[1,2,3],
               [4,5,6],
               [7,8,9]]

const matrixLength = matrix.length


interface RowProps {
  row: number[]
}

const Row: React.FC<RowProps> = ({ row }) => {

  return (row && (
    row.map((cell: number) => {
    return (<div className='cell'>{cell}</div>)
  })
 ))
 
}
function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='container'>
        <h1>Snail Sort {matrixLength}</h1>
      <div className='matrix'>
        {matrix && (matrix.map((row: number[]) => {
            return (<div className='row'><Row row={row} /></div>)
          }))}
      </div>
    </div>
  )
}

export default App

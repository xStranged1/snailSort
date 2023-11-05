//import { useState } from 'react'
import './App.css'

const matrix = [[1,2,3], [4,5,6], [7,8,9]];
const matrix4x4 = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]];

const matrixLength = matrix.length
let matrixAux = Array.from(matrix);
let matrixSolved = Array.from(matrix);

function getDimension(matrix:number[][]){
  let row = matrix[0];
  let dimension = row.length
  return dimension
}

function addNumbers(matrix:number[][], arr:number[]){
  let dim = getDimension(matrix)
  let arrToAdd = arr
  let lastRow = matrix[matrix.length-1]
  let lastRowLenght = lastRow.length

  if (arrToAdd.length > dim){
    //imposible case
  }else{
    if(lastRowLenght == dim){
      matrixSolved.push(arrToAdd)
    }else{
      let indexArrToAdd = 0
      for (let i = 0; i < dim; i++) {
        let n = lastRow[i]
        if (!n){
          if(arrToAdd[indexArrToAdd]){
            lastRow[i] = arrToAdd[indexArrToAdd]
            indexArrToAdd++
          }
        }  
      }
      if(indexArrToAdd<arrToAdd.length){ //continue adding numbers
        matrixSolved.push(arrToAdd.slice(indexArrToAdd,arrToAdd.length))
      }
    }
  }
}

function getColumn(matrix:number[][], nColumn:number){ //getColumn and delete that column from original
  let column: number[] = []
  matrix.map((row) => {
    column.push(row[nColumn])
    row.splice(nColumn, 1)
  })
  return column
}

matrixAux = matrixAux.slice(1, matrixAux.length)
getColumn(matrixSolved, 2)
matrixSolved = matrixSolved.slice(0,1)
let countCellSolved = 0
let dim = getDimension(matrix4x4)
// while(countCellSolved<((dim*dim)-dim)){
//   let arrToAdd = getColumn()
// }

interface RowProps {
  row: number[]
}

const Row: React.FC<RowProps> = ({ row }) => {

  return (row && (
    row.map((cell: number, index) => {
    return (<div key={index} className='cell'><p>{cell}</p></div>)
  })
 ))
 
}
function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='container'>
        <h1>Snail Sort {dim}</h1>
        <h2>Matrix: '[1,2,3], [4,5,6], [7,8,9]'</h2>
      <div className='matrix'>
        
        {matrix && (matrix.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          <br />
          <h3>4x4</h3>
          {matrix4x4 && (matrix4x4.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          <br />
          <h3>Matrix Aux</h3>
          {matrixAux && (matrixAux.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          <br />
          <h3>Solved</h3>
          {matrixSolved && (matrixSolved.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          
      </div>
    </div>
  )
}

export default App

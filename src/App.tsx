//import { useState } from 'react'
import './App.css'

const matrix = [[1,2,3], [4,5,6], [7,8,9]];
const matrix4x4 = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]];



function copiarMatriz(matriz:number[][]) {
  return matriz.map(row => [...row]);
}

let matrixSolved = copiarMatriz(matrix4x4);

let matrixAux = copiarMatriz(matrix4x4); 

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

function getRow(matrix:number[][], nRow:number){ //getRow and delete that row from original
  
  let row = matrixAux[nRow]

  matrix.splice(nRow, 1)

  return row
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
matrixSolved = matrixSolved.slice(0,1)
let dim = getDimension(matrix4x4)
let countCellSolved = dim
let nCells = (dim*dim)
while(countCellSolved < nCells){
  let firstRow = matrixAux[0]
  let arrToAdd = getColumn(matrixAux, (firstRow.length-1))
  addNumbers(matrixSolved, arrToAdd) 
  countCellSolved = countCellSolved + arrToAdd.length  // 🐍 🡫
  if (countCellSolved >= nCells) break

  let lastRow = getRow(matrixAux, (matrixAux.length-1))
  addNumbers(matrixSolved, lastRow.reverse()) // 🐍 🡨
  countCellSolved = countCellSolved + lastRow.length
  if (countCellSolved >= nCells) break

  let firstColumn = getColumn(matrixAux, 0) // 🐍 🡩
  addNumbers(matrixSolved, firstColumn.reverse())
  countCellSolved = countCellSolved + firstColumn.length
  if (countCellSolved >= nCells) break

  firstRow = getRow(matrixAux, 0)
  addNumbers(matrixSolved, firstRow) // 🐍 🡪
  countCellSolved = countCellSolved + firstRow.length
  if (countCellSolved >= nCells) break
 
}

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

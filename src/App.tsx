import './App.css'
import challenge from '../src/challenge.png'

const matrix3x3 = [[1,2,3], [4,5,6], [7,8,9]];
const matrix4x4 = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]];

const matrix8x8:number[][] = [] //create matrix 8x8 random
for (let i = 0; i < 8; i++) {
  const row = [];
  for (let j = 0; j < 8; j++) {
    row.push(Math.floor((Math.random() * 99)+1))
  }
  matrix8x8.push(row);
}

function copiarMatriz(matriz:number[][]) {
  return matriz.map(row => [...row]);
}

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
      matrix.push(arrToAdd)
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
        matrix.push(arrToAdd.slice(indexArrToAdd,arrToAdd.length))
      }
    }
  }
}

function getRow(matrix:number[][], nRow:number){ //getRow and delete that row from original
  
  let row = matrix[nRow]

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

function snail(matrix:number[][]){
  let matrixSolved = copiarMatriz(matrix);
  let matrixAux = copiarMatriz(matrix); 
  matrixAux = matrixAux.slice(1, matrixAux.length)
  matrixSolved = matrixSolved.slice(0,1)
  let dim = getDimension(matrix)
  let countCellSolved = dim
  let nCells = (dim*dim)
  while(countCellSolved < nCells){
    let firstRow = matrixAux[0]
    let arrToAdd = getColumn(matrixAux, (firstRow.length-1))
    addNumbers(matrixSolved, arrToAdd) 
    countCellSolved = countCellSolved + arrToAdd.length  // 🐌 🡫
    if (countCellSolved >= nCells) break

    let lastRow = getRow(matrixAux, (matrixAux.length-1))
    addNumbers(matrixSolved, lastRow.reverse()) // 🐌 🡨
    countCellSolved = countCellSolved + lastRow.length
    if (countCellSolved >= nCells) break

    let firstColumn = getColumn(matrixAux, 0) // 🐌 🡩
    addNumbers(matrixSolved, firstColumn.reverse())
    countCellSolved = countCellSolved + firstColumn.length
    if (countCellSolved >= nCells) break

    firstRow = getRow(matrixAux, 0)
    addNumbers(matrixSolved, firstRow) // 🐌 🡪
    countCellSolved = countCellSolved + firstRow.length
    if (countCellSolved >= nCells) break
  }
  return matrixSolved
}

let matrix3x3Solved = snail(matrix3x3)
let matrix4x4Solved = snail(matrix4x4)
let matrix8x8Solved = snail(matrix8x8)



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
      <h1>🐌 Snail Sort 🐌</h1>
      <div className='separator-sm'/>
      <h2>The challenge</h2>
      <img style={{border: "1px solid #fff"}} src={challenge} alt="challenge" />
      <div className='separator-sm'/>
      <div className='separator-sm'/>

      <div className='matrix'>
          <h2>Matrix 3x3</h2>
          <p className='subtitle'>{JSON.stringify(matrix3x3)}</p>
          {matrix3x3 && (matrix3x3.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          <br />
          <br />

          <h2>Matrix 3x3 snailed 🐌</h2>
          <p className='subtitle'>{JSON.stringify(matrix3x3Solved)}</p>
          {matrix3x3Solved && (matrix3x3Solved.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          <div className='separator'/>

          <h2>Matrix 4x4</h2>
          <p className='subtitle'>{JSON.stringify(matrix3x3Solved)}</p>
          {matrix4x4 && (matrix4x4.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          <div className='separator-sm'/>
          
          <h2>Matrix 4x4 snailed 🐌</h2>
          <p className='subtitle'>{JSON.stringify(matrix4x4Solved)}</p>
          {matrix4x4Solved && (matrix4x4Solved.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          <div className='separator'/>

          <h2>Matrix 8x8 random</h2>
          <p className='subtitle'>{JSON.stringify(matrix8x8)}</p>
          {matrix8x8  && (matrix8x8.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          <div className='separator-sm'/>

          <h2>Matrix 8x8 snailed 🐌</h2>
          <p className='subtitle'>{JSON.stringify(matrix8x8Solved)}</p>
          {matrix4x4Solved && (matrix8x8Solved.map((row: number[], index) => {
            return (<div key={index} className='row'><Row row={row} /></div>)
          }))}
          <div className='separator'/>
      </div>
    </div>
  )
}

export default App

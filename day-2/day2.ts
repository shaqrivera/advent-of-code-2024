import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
const rows = input.split('\n').map(row => row.split(' ').map(number => parseInt(number)))
enum Direction {
    ASCENDING = 'asc',
    DESCENDING = 'desc'
}

function processRow(row: number[]) {
    const state: {
        direction: Direction | null,
        previousNumber: number
        firstIteration: boolean
        unsafeRowDetected: boolean
    } = {
        direction: null,
        previousNumber: 0,
        firstIteration: true,
        unsafeRowDetected: false
    }

    for(const number of row) {
        if(state.firstIteration) {
            state.previousNumber = number
            state.firstIteration = false
            continue
        } 
        // Numbers in the row must differ by at least one and at most three.
        if(state.previousNumber === number || Math.abs(state.previousNumber - number) > 3) {
            state.unsafeRowDetected = true
            break
        }
        const direction: Direction = state.previousNumber < number ? Direction.ASCENDING : Direction.DESCENDING
        if(!state.direction) {
            state.previousNumber = number
            state.direction = direction
            continue
        }
        // Numbers in row must be either all increasing or all decreasing
        if(state.direction !== direction) {
            state.unsafeRowDetected = true
            break
        }
        state.previousNumber = number
    }
    return state.unsafeRowDetected
}

function partOne() {
    let safeRows = 0
    let unsafeRows = 0
    rows.forEach(row => {
       if(processRow(row)){
            // Unsafe row detected
            unsafeRows += 1
       } else {
        safeRows +=1
       }
    })
    return safeRows
}

function partTwo() {
    let safeRows = 0
    let unsafeRows = 0

    rows.forEach(row => {
        let unsafe = processRow(row)
        if(unsafe) {
            for(let i = 0; i < row.length; i++) {
                const subarray = row.filter((_, j) => i !== j)
                const subarrayIsUnsafe = processRow(subarray)
                if(!subarrayIsUnsafe) {
                    unsafe = subarrayIsUnsafe
                    break
                }
            }
        }
        if(!unsafe) {
            safeRows +=1
        } else {
            unsafeRows +=1
        }
    })

    return safeRows
}



console.log('Part 1: The total amount of safe rows is ', partOne())

console.log('Part 2: The total amount of safe rows is ', partTwo())

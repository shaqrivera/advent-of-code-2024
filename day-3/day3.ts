import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')


function partOne() {
    const regex = /mul\(\d{1,3}\,\d{1,3}\)/g
    const matches = input.match(regex)?.map(string => string.match(/\d{1,3}/g)?.map(str => parseInt(str)))
    const result = matches?.reduce((acc, val) => {
        return acc + (val![0] * val![1])
    }, 0)
    return result
}

function partTwo() {
    const regex = /mul\(\d{1,3}\,\d{1,3}\)|do\(\)|don\'t\(\)/g
    const matches = input.match(regex)
    let enabled = true
    const enabledOperations: number[][] = []
    matches?.forEach(match => {
        if(match === 'do()') {
            enabled = true
        } else if(match === `don't()`) {
            enabled = false
        } else {
            if(enabled) {
                enabledOperations.push(match.match(/\d{1,3}/g)?.map(str => parseInt(str)) as number[])
            }
        }
    })
    const result = enabledOperations?.reduce((acc, val) => {
        return acc + (val![0] * val![1])
    }, 0)
    return result
}

console.log('Part 1: The sum of all the multiplications is ', partOne())

console.log('Part 2: The sum of all enabled multiplications is ', partTwo())

import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
const rows = input.split('\n')
const leftList: number[] = []
const rightList: number[] = []

rows.forEach(row => {
    const [leftNumber, rightNumber] = row.split('   ').map(string => parseInt(string))
    leftList.push(leftNumber)
    rightList.push(rightNumber)
})

leftList.sort((a, b) => a - b)
rightList.sort((a, b) => a - b)

let distance = 0

leftList.forEach((leftNumber, i) => {
    const rightNumber = rightList[i]
    distance += Math.abs(leftNumber - rightNumber)
})

const similarities: number[] = []

leftList.forEach(leftNumber => {
    const appearances = rightList.filter(rightNumber => rightNumber === leftNumber)
    similarities.push(leftNumber * appearances.length)
})

const similarityScore = similarities.reduce((acc, similarity) =>  acc + similarity, 0)


console.log('Part 1: The total distance is ', distance)
console.log('Part 2: The similarity score is ', similarityScore)
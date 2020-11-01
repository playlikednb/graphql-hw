import { v4 } from 'uuid'

export function createHash(str: string): string {
  return `${str}:${str}`
}

export function checkPassword(str1: string, str2: string): boolean {
  const result = str1.split(':')[0]

  if (result === str2) {
    return true
  }

  return false
}

export function generateRefreshToken(): string {
  return `${v4()
    .split('-')
    .reverse()
    .join('')}${v4()
    .split('-')
    .join('')}`
}

console.log(generateRefreshToken())

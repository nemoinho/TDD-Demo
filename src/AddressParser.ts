export class AddressParser {
  splitStreetAndHousenumber(streetAndHousenumber: string) {
    const trimmedLine = streetAndHousenumber.trim()
    const housenumberPattern = /(?:\d+(?:\s[-\/]\s))?\d+(?:\s[a-z])?$/i
    const housenumberMatch = trimmedLine.match(housenumberPattern)
    if (housenumberMatch) {
      const street = trimmedLine.slice(0, housenumberMatch.index).trim()
      const housenumber = housenumberMatch[0].trim()
      return [street, housenumber]
    }
    return [trimmedLine, '']
  }
}

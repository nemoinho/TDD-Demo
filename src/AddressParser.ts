export class AddressParser {
  splitStreetAndHousenumber(streetAndHousenumber: string) {
    const trimmedLine = streetAndHousenumber.trim()
    const housenumberPattern = /(?:\d+(?:\s[a-z])?(?:\s[-\/]\s))?\d+(?:\s[a-z]|\s\d\/\d)?$|\d+(?:\s[a-z]+)?\s\/{2}\s+.*/i
    const housenumberMatch = trimmedLine.match(housenumberPattern)
    if (housenumberMatch) {
      const street = trimmedLine.slice(0, housenumberMatch.index).trim()
      const housenumber = housenumberMatch[0].trim()
      return [street, housenumber]
    }
    return [trimmedLine, '']
  }
}

export class AddressParser {
  splitStreetAndHousenumber(streetAndHousenumber: string) {
    const trimmedLine = streetAndHousenumber.trim()

    // New streets without a proper name AND no housenumber
    if (/^Straße \d+$/.test(trimmedLine)) {
      return [trimmedLine, '']
    }

    // New streets without a proper name
    // If the input contains " Nr." use that to split the line 
    const noMatcher = trimmedLine.match(/\sNr\./i);
    if (noMatcher) {
      const parts = trimmedLine.split('Nr.');
      return [parts.shift()!.trim(), 'Nr.' + parts.join('Nr.')];
    }

    // This regex is rather complicated...
    // Visualization: https://regexper.com/#%2F%5Cs%28%3F%3A%5Cd%2B%28%3F%3A%5Cs*%5Ba-z%5D%29%3F%28%3F%3A%5Cs*%5B-%5C%2F%5D%5Cs*%29%29%3F%5Cd%2B%28%3F%3A%5Cs*%5Ba-z%5D%7C%5Cs%5Cd%5C%2F%5Cd%29%3F%24%7C%5Cs%5Cd%2B%28%3F%3A%5Cs*%5Ba-z%5D%2B%29%3F%5Cs*%5C%2F%7B2%7D%5Cs*.*%2Fi
    // Explanation with tests: https://regex101.com/r/foHVae/1
    const housenumberPattern = /\s(?:\d+(?:\s*[a-z])?(?:\s*[-\/]\s*))?\d+(?:\s*[a-z]|\s\d\/\d)?$|\s\d+(?:\s*[a-z]+)?\s*\/{2}\s*.*/i
    const housenumberMatch = trimmedLine.match(housenumberPattern)
    if (housenumberMatch) {
      const street = trimmedLine.slice(0, housenumberMatch.index).trim()
      const housenumber = housenumberMatch[0].trim()
      return [street, housenumber]
    }
    return [trimmedLine, '']
  }
}

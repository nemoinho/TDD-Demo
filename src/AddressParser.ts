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

export class AddressParser {
  splitStreetAndHousenumber(streetAndHousenumber: string) {
    const trimmedLine = streetAndHousenumber.trim()
    return [trimmedLine, '']
  }
}

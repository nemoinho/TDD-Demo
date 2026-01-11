import { describe, it, expect } from 'vitest'
import { AddressParser } from './AddressParser'

describe('AddressParser', () => {
  const addressParser = new AddressParser()

  describe('splitStreetAndHousenumber', () => {
    const streets = [
      'Am Kaiserkai',
      'Güntherstraße',
      'Clemens-Schultz-Str.',
      'Nagelsweg',
      'Brücke des 17. Juni',
      '1. Hafenstraße',
      'D4', // Special case "Quadratestadt"
    ]
    const housenumbers = [
      '',
      '7',
      '13',
      '7 a',
      '7 B',
      '7 - 13',
      '7 / 8',
      '7 A - 13 b',
      '7 a / 8 b',
      '17 1/2', // special case in cologne
      '7 // App. 3' // special case of apartments and similar
    ]

    it('should provide a tuple of street and housenumber', () => {
      const tuple = addressParser.splitStreetAndHousenumber('')
      expect(tuple).toHaveLength(2)
      expect(tuple[0]).toBeTypeOf('string')
      expect(tuple[1]).toBeTypeOf('string')
    })

    describe.each(streets)('street: "%s"', street => {
      describe.each(housenumbers)('housenumber: "%s"', housenumber => {
        it('should split street and housenumber into a tuple', () => {
          const streetAndHousenumber = `${street} ${housenumber}`
          expect(addressParser.splitStreetAndHousenumber(streetAndHousenumber))
            .toEqual([street, housenumber])
        })
      })
    })
  })
})

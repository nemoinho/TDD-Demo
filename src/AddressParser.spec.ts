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
    ]
    const housenumbers = [
      '',
      '7',
      '7a',
      '7 a',
      '4-7',
      '4-7a',
      '4-7 a',
      '4a-7',
      '4a-7a',
      '4a-7 a',
      '4 a-7',
      '4 a-7a',
      '4 a-7 a',
      '4 - 7',
      '4 - 7a',
      '4 - 7 a',
      '4a - 7',
      '4a - 7a',
      '4a - 7 a',
      '4 a - 7',
      '4 a - 7a',
      '4 a - 7 a',
      '4/7',
      '4/7a',
      '4/7 a',
      '4a/7',
      '4a/7a',
      '4a/7 a',
      '4 a/7',
      '4 a/7a',
      '4 a/7 a',
      '4 / 7',
      '4 / 7a',
      '4 / 7 a',
      '4a / 7',
      '4a / 7a',
      '4a / 7 a',
      '4 a / 7',
      '4 a / 7a',
      '4 a / 7 a',
      '4 // 7',
      '4 // 7a',
      '4 // 7 a',
      '4a // 7',
      '4a // 7a',
      '4a // 7 a',
      '4 a // 7',
      '4 a // 7a',
      '4 a // 7 a',
      '4 // App. 7',
      '4 // App. 7a',
      '4 // App. 7 a',
      '4a // App. 7',
      '4a // App. 7a',
      '4a // App. 7 a',
      '4 a // App. 7',
      '4 a // App. 7a',
      '4 a // App. 7 a',
      '4 // 7 Stock.',
      '4a // 7 Stock.',
      '4 a // 7 Stock.',
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

    describe('Quadtratestadt in Mannheim', () => {
      describe.each(['D4', 'C11'])('block: "%s"', block => {
        describe.each(['5', '23'])('housenumber: "%s"', housenumber => {
          it('should split block and housenumber into a tuple', () => {
            const blockAndHousenumber = `${block} ${housenumber}`
            expect(addressParser.splitStreetAndHousenumber(blockAndHousenumber))
              .toEqual([block, housenumber])
          })
        })
      })
    })

    describe('halfed housenumber in Cologne', () => {
      describe.each(streets)('block: "%s"', street => {
        it('should split street and halfed housenumber into a tuple', () => {
          expect(addressParser.splitStreetAndHousenumber(`${street} 17 1/2`))
            .toEqual([street, '17 1/2'])
        })
      })
    })

    describe('new unnamed streets', () => {
      describe.each(['Straße 1', 'Straße 22'])('street: "%s"', street => {
        const newStreetHousenumbers = housenumbers
          // We want to ignore empty housenumbers to avoid cases like "Straße 4 Nr. "
          // These would be strictly invalid!
          .filter(housenumber => !!housenumber)
          .map(housenumber => `Nr. ${housenumber}`)
        describe.each(newStreetHousenumbers)('housenumber: "%s"', housenumber => {
          it('should split street and housenumber into a tuple', () => {
            const streetAndHousenumber = `${street} ${housenumber}`
            expect(addressParser.splitStreetAndHousenumber(streetAndHousenumber))
              .toEqual([street, housenumber])
          })
        })

        describe("absent housenumber", () => {
          it('should split street into a tuple without housenumber', () => {
            expect(addressParser.splitStreetAndHousenumber(street))
              .toEqual([street, ''])
          })
        })
      })
    })
  })
})

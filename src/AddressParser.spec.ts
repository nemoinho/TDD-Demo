import { describe, it, expect } from 'vitest'
import { AddressParser } from './AddressParser'

describe('AddressParser', () => {
  const addressParser = new AddressParser()

  describe('splitStreetAndHousenumber', () => {
    it('should provide a tuple of street and housenumber', () => {
      const tuple = addressParser.splitStreetAndHousenumber('')
      expect(tuple).toHaveLength(2)
      expect(tuple[0]).toBeTypeOf('string')
      expect(tuple[1]).toBeTypeOf('string')
    })

    describe.each([
      'Am Kaiserkai',
      'Güntherstraße',
      'Clemens-Schultz-Str.',
      'Nagelsweg',
      'Brücke des 17. Juni',
      '1. Hafenstraße',
    ])('street: "%s"', street => {
        describe.each([
          '',
          '7',
          '13',
          '7 a',
          '7 B',
          '7 - 13',
          '7 / 8',
        ])('housenumber: "%s"', housenumber => {
            it('should split street and housenumber into a tuple', () => {
              const streetAndHousenumber = `${street} ${housenumber}`
              expect(addressParser.splitStreetAndHousenumber(streetAndHousenumber))
                .toEqual([street, housenumber])
            })
          })
      })
  })
})

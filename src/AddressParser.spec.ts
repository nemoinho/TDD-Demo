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
  })
})

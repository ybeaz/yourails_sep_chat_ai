import { getSectionsFromTagsCompetencies } from '../getSectionsFromTagsCompetencies'
import { competencyTags } from '../__mocks__/competencyTagsMock'
/**
 * @test yarn jest getSectionsFromTagsCompetencies.test
 */
describe('Test function getSectionsFromTagsCompetencies', () => {
  it('test', () => {
    const outputed = getSectionsFromTagsCompetencies(competencyTags)

    const expected = ['Best Practices', 'Front-end', 'Back-end', 'AI/ ML']
    // console.info('getSectionsFromTagsCompetencies.test [11]', { outputed })

    expect(outputed).toEqual(expected)
  })
})

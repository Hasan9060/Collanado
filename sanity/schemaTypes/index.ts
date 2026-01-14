import { type SchemaTypeDefinition } from 'sanity'
import news from './news'
import academicCalendar from './academicCalendar'
import blog from './blog'
import author from './author'
import magazine from './magazine'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [magazine, news, academicCalendar, blog, author, examResult],
}

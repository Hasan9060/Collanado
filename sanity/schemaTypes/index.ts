import { type SchemaTypeDefinition } from 'sanity'
import news from './news'
import academicCalendar from './academicCalendar'

export const schema = {
    types: [news, academicCalendar],
}

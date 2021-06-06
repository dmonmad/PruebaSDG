export class Movie {
  title: string
  year: number
  director: string
  cast: string
  genre: string
  notes: string
  constructor(
    title: string,
    year: number,
    director: string,
    cast: string,
    genre: string,
    notes: string,
  ) {
    this.title = title?.trim() ?? ''
    this.year = year ?? -1
    this.director = director?.trim() ?? ''
    this.cast = cast?.trim() ?? ''
    this.genre = genre?.trim() ?? ''
    this.notes = notes?.trim() ?? ''
  }
}

import { ChangeContext, Options } from '@angular-slider/ngx-slider'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { JwPaginationComponent } from 'jw-angular-pagination'
import { Movie } from 'src/app/models/Movie'
import { sortString } from 'src/app/utils/utils'

@Component({
  selector: 'sdg-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  filtersOpen: boolean = false

  @ViewChild(JwPaginationComponent) pagination!: JwPaginationComponent

  quantityPerPage: number = 20
  maxPages: number = 5

  @Input() items: Movie[] = []
  filteredItems: Movie[] = []
  paginatedItems: Movie[] = []

  directorFilterValues: string[] = []
  castFilterValues: string[] = []
  genreFilterValues: string[] = []
  minYearMinValue: number = 0
  maxYearMaxValue: number = 0

  titleFilterValue: string = ''
  minYearFilterValue: number = 0
  maxYearFilterValue: number = 0
  directorFilterValue: string = ''
  castFilterValue: string = ''
  genreFilterValue: string = ''
  notesFilterValue: string = ''

  isLoadingData: boolean = false

  options: Options = {}

  sortBy?: SortType

  constructor() {}

  ngOnInit(): void {
    console.log(this.items)
    this.initData()
  }

  async initData() {
    console.time('initializingData')
    this.isLoadingData = true
    this.filteredItems = this.items

    this.loadFilterValues()

    console.timeEnd('initializingData')
    this.isLoadingData = false
  }

  private loadFilterValues() {
    this.items.forEach((el, index) => {
      if (index == 0) {
        this.minYearMinValue = el.year
        this.options.floor = el.year
        this.minYearFilterValue = el.year

        this.maxYearMaxValue = el.year
        this.options.ceil = el.year
        this.maxYearFilterValue = el.year
      } else {
        if (el.year < this.minYearMinValue) {
          this.minYearMinValue = el.year
          this.options.floor = el.year
          this.minYearFilterValue = el.year
        }

        if (el.year > this.maxYearMaxValue) {
          this.maxYearMaxValue = el.year
          this.options.ceil = el.year
          this.maxYearFilterValue = el.year
        }
      }

      if (el.director)
        el.director.split(',').forEach((dir) => {
          if (this.directorFilterValues.indexOf(dir) == -1 && dir != '') {
            this.directorFilterValues.push(dir)
          }
        })

      if (el.cast)
        el.cast.split(',').forEach((cast) => {
          if (this.castFilterValues.indexOf(cast) == -1 && cast != '') {
            this.castFilterValues.push(cast)
          }
        })

      if (el.genre)
        el.genre.split(',').forEach((genre) => {
          if (this.genreFilterValues.indexOf(genre) == -1 && genre != '') {
            this.genreFilterValues.push(genre)
          }
        })
    })
  }

  onChangePage(pageOfItems: Array<Movie>) {
    // update current page of items
    this.paginatedItems = pageOfItems
  }

  filter() {
    this.filteredItems = this.items.filter((el) => {
      const title = el.title.includes(this.titleFilterValue)
      const miny = el.year >= this.minYearFilterValue
      const maxy = el.year <= this.maxYearFilterValue

      const dir =
        this.directorFilterValue != ''
          ? el.director
            ? el.director.trim().includes(this.directorFilterValue)
            : false
          : true

      const cast =
        this.castFilterValue != ''
          ? el.cast
            ? el.cast.trim().includes(this.castFilterValue)
            : false
          : true

      const genre =
        this.genreFilterValue != ''
          ? el.genre
            ? el.genre.trim().includes(this.genreFilterValue)
            : false
          : true

      const notes =
        this.notesFilterValue != ''
          ? el.notes
            ? el.notes.indexOf(this.notesFilterValue) > -1
            : false
          : true
      return title && miny && maxy && dir && cast && genre && notes
    })

    this.sortItems('')
    this.pagination.setPage(1)
  }

  alternateFilter() {
    this.filtersOpen = !this.filtersOpen
  }

  sortItems(property: string) {
    if (!this.sortBy) this.sortBy = { ascendent: false, sort: FilterType.Year }

    //Cambiamos el objeto de sorting
    switch (property) {
      case 'title':
        this.sortBy.sort == FilterType.Title
          ? (this.sortBy.ascendent = !this.sortBy.ascendent)
          : ((this.sortBy.sort = FilterType.Title),
            (this.sortBy.ascendent = false))
        break
      case 'year':
        this.sortBy.sort == FilterType.Year
          ? (this.sortBy.ascendent = !this.sortBy.ascendent)
          : ((this.sortBy.sort = FilterType.Year),
            (this.sortBy.ascendent = false))
        break
      case 'director':
        this.sortBy.sort == FilterType.Director
          ? (this.sortBy.ascendent = !this.sortBy.ascendent)
          : ((this.sortBy.sort = FilterType.Director),
            (this.sortBy.ascendent = false))
        break
      case 'cast':
        this.sortBy.sort == FilterType.Cast
          ? (this.sortBy.ascendent = !this.sortBy.ascendent)
          : ((this.sortBy.sort = FilterType.Cast),
            (this.sortBy.ascendent = false))
        break
      case 'genre':
        this.sortBy.sort == FilterType.Genre
          ? (this.sortBy.ascendent = !this.sortBy.ascendent)
          : ((this.sortBy.sort = FilterType.Genre),
            (this.sortBy.ascendent = false))
        break
      case 'notes':
        this.sortBy.sort == FilterType.Notes
          ? (this.sortBy.ascendent = !this.sortBy.ascendent)
          : ((this.sortBy.sort = FilterType.Notes),
            (this.sortBy.ascendent = false))
        break
    }

    this.filteredItems.sort((a, b) => {
      if (a && b) {
        switch (this.sortBy!.sort) {
          case FilterType.Title:
            return sortString(a.title, b.title, this.sortBy!.ascendent)

          case FilterType.Year:
            return sortString(a.year.toString(), b.year.toString(), this.sortBy!.ascendent)

          case FilterType.Director:
            return sortString(a.director, b.director, this.sortBy!.ascendent)

          case FilterType.Cast:
            return sortString(a.cast, b.cast, this.sortBy!.ascendent)

          case FilterType.Genre:
            return sortString(a.genre, b.genre, this.sortBy!.ascendent)

          case FilterType.Notes:
            return sortString(a.notes, b.notes, this.sortBy!.ascendent)
        }
      }

      return -1
    })

    this.pagination.setPage(1)
  }

}

interface SortType {
  sort: FilterType
  ascendent: boolean
}

enum FilterType {
  Title,
  Year,
  Director,
  Cast,
  Genre,
  Notes,
}

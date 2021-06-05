import { ChangeContext, Options } from '@angular-slider/ngx-slider'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { JwPaginationComponent } from 'jw-angular-pagination'
import { Movie } from 'src/app/models/Movie'

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
          if (this.directorFilterValues.indexOf(dir.trim()) == -1) {
            this.directorFilterValues.push(dir.trim())
          }
        })

      if (el.cast)
        el.cast.split(',').forEach((cast) => {
          if (this.castFilterValues.indexOf(cast.trim()) == -1) {
            this.castFilterValues.push(cast.trim())
          }
        })

      if (el.genre)
        el.genre.split(',').forEach((genre) => {
          if (this.genreFilterValues.indexOf(genre.trim()) == -1) {
            this.genreFilterValues.push(genre.trim())
          }
        })
    })
    console.timeEnd('initializingData')
    this.isLoadingData = false
  }

  onChangePage(pageOfItems: Array<Movie>) {
    // update current page of items
    this.paginatedItems = pageOfItems
  }

  filter() {
    console.time('time')
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

    //this.sortItems('')
    console.timeEnd('time')
    this.pagination.setPage(1)
  }

  alternateFilter() {
    this.filtersOpen = !this.filtersOpen
  }

  sortItems(property: string) {
    if (!this.sortBy) this.sortBy = { ascendent: false, sort: FilterType.Year }

    console.log(property)
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
            if (a.title === b.title) {
              return 0
            }
            // nulls sort after anything else
            else if (a.title === null) {
              return 1
            } else if (b.title === null) {
              return -1
            }
            // otherwise, if we're ascending, lowest sorts first
            else if (this.sortBy!.ascendent) {
              return a.title < b.title ? -1 : 1
            }
            // if descending, highest sorts first
            else {
              return a.title < b.title ? 1 : -1
            }
          case FilterType.Year:
            if (a.year === b.year) {
              return 0
            }
            // nulls sort after anything else
            else if (a.year === null) {
              return 1
            } else if (b.year === null) {
              return -1
            }
            // otherwise, if we're ascending, lowest sorts first
            else if (this.sortBy!.ascendent) {
              return a.year < b.year ? -1 : 1
            }
            // if descending, highest sorts first
            else {
              return a.year < b.year ? 1 : -1
            }
          case FilterType.Director:
            if (a.director === b.director) {
              return 0
            }
            // nulls sort after anything else
            else if (a.director === null) {
              return 1
            } else if (b.director === null) {
              return -1
            }
            // otherwise, if we're ascending, lowest sorts first
            else if (this.sortBy!.ascendent) {
              return a.director < b.director ? -1 : 1
            }
            // if descending, highest sorts first
            else {
              return a.director < b.director ? 1 : -1
            }
          case FilterType.Cast:
            if (a.cast === b.cast) {
              return 0
            }
            // nulls sort after anything else
            else if (a.cast === null) {
              return 1
            } else if (b.cast === null) {
              return -1
            }
            // otherwise, if we're ascending, lowest sorts first
            else if (this.sortBy!.ascendent) {
              return a.cast < b.cast ? -1 : 1
            }
            // if descending, highest sorts first
            else {
              return a.cast < b.cast ? 1 : -1
            }
          case FilterType.Genre:
            if (a.genre === b.genre) {
              return 0
            }
            // nulls sort after anything else
            else if (a.genre === null) {
              return 1
            } else if (b.genre === null) {
              return -1
            }
            // otherwise, if we're ascending, lowest sorts first
            else if (this.sortBy!.ascendent) {
              return a.genre < b.genre ? -1 : 1
            }
            // if descending, highest sorts first
            else {
              return a.genre < b.genre ? 1 : -1
            }
          case FilterType.Notes:
            if (a.notes === b.notes) {
              return 0
            }
            // nulls sort after anything else
            else if (a.notes === null) {
              return 1
            } else if (b.notes === null) {
              return -1
            }
            // otherwise, if we're ascending, lowest sorts first
            else if (this.sortBy!.ascendent) {
              return a.notes < b.notes ? -1 : 1
            }
            // if descending, highest sorts first
            else {
              return a.notes < b.notes ? 1 : -1
            }
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

import { Options } from '@angular-slider/ngx-slider'
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
  maxYearFilterValue: number = 1
  directorFilterValue: string = ''
  castFilterValue: string = ''
  genreFilterValue: string = ''
  notesFilterValue: string = ''

  isLoadingData: boolean = false

  options: Options = {}

  constructor() {}

  ngOnInit(): void {
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
          console.log(el.year)
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
          let s = dir.trim()
          if (this.directorFilterValues.indexOf(s) == -1) {
            this.directorFilterValues.push(s)
          }
        })

      if (el.cast)
        el.cast.split(',').forEach((cast) => {
          let s = cast.trim()
          if (this.castFilterValues.indexOf(s) == -1) {
            this.castFilterValues.push(s)
          }
        })

      if (el.genre)
        el.genre.split(',').forEach((genre) => {
          let s = genre.trim()
          if (this.genreFilterValues.indexOf(s) == -1) {
            this.genreFilterValues.push(s)
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
    // this.filteredItems = this.items.filter((el) =>
    //   el.title.indexOf(this.titleFilterValue) > -1 || this.minYearFilterValue
    //     ? el.year < this.minYearFilterValue!
    //     : true || this.maxYearFilterValue
    //     ? el.year > this.maxYearFilterValue!
    //     : true || this.minYearFilterValue
    //     ? el.year < this.minYearFilterValue!
    //     : true,
    // )
    console.timeEnd('time')
    this.pagination.setPage(1)
    console.log(this.filteredItems)
  }

  alternateFilter() {
    this.filtersOpen = !this.filtersOpen
  }
}

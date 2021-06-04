import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { JwPaginationComponent } from 'jw-angular-pagination'
import { Movie } from 'src/app/models/Movie'

@Component({
  selector: 'sdg-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor() {}

  filtersOpen: boolean = true

  @ViewChild(JwPaginationComponent) pagination!: JwPaginationComponent

  quantityPerPage: number = 20
  maxPages: number = 5

  @Input() items: Movie[] = []
  filteredItems: Movie[] = []
  paginatedItems: Movie[] = []

  titleFilterValue: string = ''
  minYearFilterValue?: number
  maxYearFilterValue?: number
  directorFilterValue: string = ''
  castFilterValue: string = ''
  genreFilterValue: string = ''
  notesFilterValue: string = ''

  ngOnInit(): void {
    console.log(this.items)
    this.filteredItems = this.items
  }

  onChangePage(pageOfItems: Array<Movie>) {
    // update current page of items
    this.paginatedItems = pageOfItems
  }

  filter() {
    console.time('time')
    this.filteredItems = this.items.filter(
      (el) => el.title.indexOf(this.titleFilterValue) > -1,
    )
    console.timeEnd('time')
    this.pagination.setPage(1)
    console.log(this.filteredItems)
  }

  alternateFilter() {
    this.filtersOpen = !this.filtersOpen
  }

}

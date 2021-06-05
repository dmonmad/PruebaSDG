import { Component, OnInit } from '@angular/core'
import { Movie } from 'src/app/models/Movie'
import { DataService } from 'src/app/services/data.service'
import { UiService } from 'src/app/services/ui.service'
import { getPagination } from '../../utils/pagination'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = []
  isLoading: boolean = false

  constructor(private dataSvc: DataService, private uiSvc: UiService) {}

  ngOnInit(): void {
    this.loadMovies()
  }

  loadMovies() {
    this.isLoading = true
    this.dataSvc.fetchMoviesData().subscribe(
      (res) => {
        this.movies = res
        this.movies.forEach((element) => {
          if (element.title) element.title = element.title.trim()
          if (element.cast) element.cast = element.cast.trim()
          if (element.director) element.director = element.director.trim()
          if (element.genre) element.genre = element.genre.trim()
          if (element.notes) element.notes = element.notes.trim()
        })
      },
      (err) => {},
      () => {
        this.isLoading = false
      },
    )
  }
}

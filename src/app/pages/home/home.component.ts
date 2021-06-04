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
  isLoading : boolean = false;

  constructor(private dataSvc: DataService, private uiSvc: UiService) {}

  ngOnInit(): void {
    this.loadMovies()
  }

  loadMovies() {
    this.isLoading = true
    this.dataSvc.fetchMoviesData().subscribe(
      (res) => {
        this.movies = res
        // this.loadFilteredMovies()
      },
      (err) => {},
      () => {
        this.isLoading = false
      },
    )
  }

}

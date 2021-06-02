import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Movie } from '../models/Movie'
import { Observable } from 'rxjs'
import { routes } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  fetchMoviesData(): Observable<Movie[]> {
    return this.http.get<Movie[]>(routes.baseUrl + routes.getMovies)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
  owner: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})

export class FlickrService {


  private flickrArgs = {
    params: {
      api_key: '',
      sort: "date-posted-desc",
      privacy_filter : '1',
      safe_search : '1',
      content_type : '1',
      media: 'photos',
      format : 'json',
      nojsoncallback: '1',
      per_page : '12',
      method: '',
      tags: '',
      text: '',
      page: '',
      photo_id: 0,
    }
  }

  private flickrUrl = "https://www.flickr.com/services/rest/";
  prevKeyword!: string;
  currPage = 1;

  constructor(private http: HttpClient) { }

  search_keyword(keyword: string) : Observable<any> {
    if ( this.prevKeyword === keyword ) {
      this.currPage ++;
    } else {
      this.currPage = 1;
    }
    this.prevKeyword = keyword;
    const API_URL = this.flickrUrl;
    this.flickrArgs.params['method'] = 'flickr.photos.search';
    this.flickrArgs.params['tags'] = keyword;
    this.flickrArgs.params['text'] = keyword;
    this.flickrArgs.params['page'] = this.currPage.toString();
    this.flickrArgs.params['api_key'] = environment.flickr.api_key;
    return this.http.get<any>(API_URL, this.flickrArgs)
    .pipe(map((res: FlickrOutput) => {
      const urlArr: any[] = [];
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const photoObj = {
          url: `https://farm${ph.farm}.static.flickr.com/${ph.server}/${ph.id}_${ph.secret}`,
          title: ph.title,
          id: ph.id,
        };
        urlArr.push(photoObj);
      });
      return urlArr;
    }));
  }

  getImageInfo(imageId : number): Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrArgs.params['method'] = 'flickr.photos.getInfo';
    this.flickrArgs.params['photo_id'] = imageId;
    return this.http.get<any>(API_URL,this.flickrArgs);
  }
}

# FlickrPhotoSearch

This project is a Flickr Photo search application with Flickr API using Angular 14.1.2.

## How to build and run a Project

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Using Flickr API

### Setting the api key

Set your flickr api key in `environment.ts` file.

```
export const environment = {
  flickr: {
    api_key: 'XXXX',
  }
};
```
### Get images using Flickr API

Send Http request to Flickr API_URL with several parameters to get the list of the images.

```
API_URL = 'https://www.flickr.com/services/rest/'
params: {
      content_type : '1',
      media: 'photos',
      format : 'json',
      nojsoncallback: '1',
      per_page : '12',
      method: 'flickr.photos.search',
      tags: keyword,
      text: keyword,
      page: 12,
      photo_id: 0,
}
return this.http.get<any>(API_URL,this.flickrArgs);
```

Get image url using photo infomation
```
url: `https://farm${ph.farm}.static.flickr.com/${ph.server}/${ph.id}_${ph.secret}`,
```

### Get image information

Get details of the image using method 'flickr.photos.getInfo' and 'photo_id'
```
    this.flickrArgs.params['method'] = 'flickr.photos.getInfo';
    this.flickrArgs.params['photo_id'] = imageId;
    return this.http.get<any>(API_URL,this.flickrArgs);
```
## Implement infinite scrolling

Use 'ngx-infinite-scroll' to implement infinite scrolling

```
    <div 
        class="search-results" 
        infiniteScroll 
        [infiniteScrollDistance]="2" 
        [infiniteScrollThrottle]="50" 
        (scrolled)="onScroll()"
    >
    </div>
```

Add images of next page when scrolling.

```
  onScroll() {
    if ( this.keyword && this.keyword.length > 0 ) {
      firstValueFrom(this.flickrService.search_keyword(this.keyword))
      .then(res => {
        this.images = this.images.concat(res);
      })
    }
  }
```

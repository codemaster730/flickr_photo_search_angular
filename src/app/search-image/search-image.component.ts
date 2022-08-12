import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';
import { firstValueFrom } from 'rxjs';

//declare let $: any;

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent implements OnInit {

  images = [] as any[];
  keyword!: string;
  public selectedImg:any = null;
  public selectedUrl: string = '';

  constructor(private flickrService: FlickrService) { }

  ngOnInit(): void {
  }

  search(event: any) {
    this.keyword = event.target.value.toLowerCase();
    console.log(this.keyword);
    if ( this.keyword && this.keyword.length > 0 ) {
      // this.flickrService.search_keyword(this.keyword).subscribe( res => {
      //   console.log(res)
      // })
      firstValueFrom(this.flickrService.search_keyword(this.keyword))
      .then(res => {
        this.images = res;
      });
    }
    console.log(this.images);
  }

  imageInfo(id : number, url: string) {
    this.flickrService.getImageInfo(id).subscribe(result => {
      this.selectedUrl = url;
      this.selectedImg = result.photo;
      $('#selectedModal').modal('show');
    })
  }

  onScroll() {
    if ( this.keyword && this.keyword.length > 0 ) {
      firstValueFrom(this.flickrService.search_keyword(this.keyword))
      .then(res => {
        this.images = this.images.concat(res);
      })
    }
  }

}

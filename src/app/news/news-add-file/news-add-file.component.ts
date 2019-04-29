import { Component, OnInit } from '@angular/core';
import { NewsService } from './../news.service';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-news-add-file',
  templateUrl: './news-add-file.component.html',
  styleUrls: ['./news-add-file.component.scss']
})
export class NewsAddFileComponent implements OnInit {

    public selectedFile = null;
    constructor(
        private newsService: NewsService,
        private mediaService: MediaService
    ) { }

    ngOnInit() {
    }

    showModal() {
    $('#exampleModal').modal('toggle');
    }

    closeModal() {
    $('#exampleModal').modal('hide');
    }
    fileChange(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            console.log(formData);
        }
    }
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
    onUpload() {
        this.mediaService.addNewMedia(this.selectedFile).subscribe(
            data => console.log(data),
            err => console.log(err)
        );
    }
}

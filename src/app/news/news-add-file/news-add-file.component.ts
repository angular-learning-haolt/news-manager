import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NewsService } from './../news.service';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-news-add-file',
  templateUrl: './news-add-file.component.html',
  styleUrls: ['./news-add-file.component.scss']
})
export class NewsAddFileComponent implements OnInit {

    public selectedFile = null;
    public selectedFileId: number;
    public selectedFileIdFromGalery: number;
    public allMedia;
    @Output() selectedFileEmit = new EventEmitter<any>();
    constructor(
        private newsService: NewsService,
        private mediaService: MediaService
    ) { }

    ngOnInit() {
        this.mediaService.getAllMedia().subscribe(
            data => {
                console.log(data);
                this.allMedia = data;
                this.allMedia = this.allMedia.map(
                    (item) => {
                        item.hasSelect = false;
                        return item;
                    }
                );
            },
            err => console.log(err)
        );
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
        this.closeModal();
        if (this.selectedFile) {
            this.mediaService.addNewMedia(this.selectedFile).subscribe(
                data => {
                    this.selectedFileEmit.emit(data);
                },
                err => console.log(err)
            );
        } else if (this.selectedFileIdFromGalery) {
            this.mediaService.getMediaByID(this.selectedFileIdFromGalery).subscribe(
                data => {
                    this.selectedFileEmit.emit(data);
                },
                err => console.log(err)
            );
        }
        console.log(this.selectedFileEmit);
    }
    onSelectImg(id) {
        this.selectedFileIdFromGalery = id;
        console.log(id);
        let curentMedia = this.allMedia.filter(
            (item) => item.id === id
        )[0];
        if (curentMedia.hasSelect) {
            curentMedia.hasSelect = false;
        } else{
            curentMedia.hasSelect = true;
        }
        let othersMedia = this.allMedia.filter(
            (item) => item.id !== id
        ).map(
            (item) => {
                item.hasSelect = false;
                return item;
            }
        );
    }
}

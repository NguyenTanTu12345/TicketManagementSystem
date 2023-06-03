import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { ExcelService } from 'src/app/services/excel/excel.service';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.css']
})
export class ListArtistComponent {
  displayedColumns: string[] = ['No.', 'artistImagePath', 'artistName', 'other'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  artist: Artist[] = [];

  constructor(
    private artistService: ArtistService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.artistService.getAll().subscribe({
      next: (res) => {
        this.artist = res;
        this.dataSource = new MatTableDataSource(this.artist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  exportFileExcel() {
    this.excelService.exportExcelFile(this.artist, 'artist');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

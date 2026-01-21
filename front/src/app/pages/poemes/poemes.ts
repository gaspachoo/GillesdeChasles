import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, ContentDto } from '../../services/content.service';

interface PoemeItem {
  id: number;
  title: string;
  isExpanded: boolean;
  content?: string;
  isLoading?: boolean;
}

@Component({
  selector: 'app-poemes',
  imports: [CommonModule],
  templateUrl: './poemes.html',
  styleUrl: './poemes.css',
})
export class Poemes implements OnInit {
  poemes: PoemeItem[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private contentService: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPoemes();
  }

  loadPoemes() {
    this.contentService.getContentTitles('poeme').subscribe({
      next: (data: ContentDto[]) => {
        this.poemes = data.map(item => ({
          id: item.id,
          title: item.title,
          isExpanded: false
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des poèmes:', err);
        this.error = 'Impossible de charger les poèmes. Veuillez réessayer plus tard.';
        this.isLoading = false;
      }
    });
  }

  togglePoeme(poeme: PoemeItem) {
    poeme.isExpanded = !poeme.isExpanded;

    if (poeme.isExpanded && !poeme.content) {
      poeme.isLoading = true;
      this.contentService.getContentById(poeme.id).subscribe({
        next: (data: ContentDto) => {
          poeme.content = data.contentText;
          poeme.isLoading = false;
          this.cdr.markForCheck();
          console.log(poeme.content);
        },
        error: (err) => {
          console.error('Erreur lors du chargement du poème:', err);
          poeme.isLoading = false;
          poeme.isExpanded = false;
          this.cdr.markForCheck();
        }
      });
    }
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, ContentDto } from '../../services/content.service';

interface ReflexionItem {
  id: number;
  title: string;
  isExpanded: boolean;
  content?: string;
  isLoading?: boolean;
}

@Component({
  selector: 'app-reflexions',
  imports: [CommonModule],
  templateUrl: './reflexions.html',
  styleUrl: './reflexions.css',
})
export class Reflexions implements OnInit {
  reflexions: ReflexionItem[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private contentService: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadReflexions();
  }

  loadReflexions() {
    this.contentService.getContentTitles('reflexion').subscribe({
      next: (data: ContentDto[]) => {
        this.reflexions = data.map(item => ({
          id: item.id,
          title: item.title,
          isExpanded: false
        }));
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réflexions:', err);
        this.error = 'Impossible de charger les réflexions. Veuillez réessayer plus tard.';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  toggleReflexion(reflexion: ReflexionItem) {
    reflexion.isExpanded = !reflexion.isExpanded;

    if (reflexion.isExpanded && !reflexion.content) {
      reflexion.isLoading = true;
      this.contentService.getContentById(reflexion.id).subscribe({
        next: (data: ContentDto) => {
          reflexion.content = data.contentText;
          reflexion.isLoading = false;
          this.cdr.markForCheck();
          console.log(reflexion.content);
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la réflexion:', err);
          reflexion.isLoading = false;
          reflexion.isExpanded = false;
          this.cdr.markForCheck();
        }
      });
    }
  }
}

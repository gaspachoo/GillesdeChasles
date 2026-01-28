import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, ContentDto } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { ContentFormComponent } from '../../components/content-form/content-form';
import { Subscription } from 'rxjs';

interface PoemeItem {
  id: number;
  title: string;
  isExpanded: boolean;
  content?: string;
  isLoading?: boolean;
}

@Component({
  selector: 'app-poemes',
  imports: [CommonModule, ContentFormComponent],
  templateUrl: './poemes.html',
  styleUrl: './poemes.css',
})
export class Poemes implements OnInit, OnDestroy {
  poemes: PoemeItem[] = [];
  isLoading = true;
  error: string | null = null;
  isAuthenticated = false;
  showForm = false;
  editingPoeme: ContentDto | undefined;
  formSubmitting = false;
  formError = '';
  private authSubscription?: Subscription;

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuth) => {
        this.isAuthenticated = isAuth;
        this.cdr.markForCheck();
      }
    );
    this.loadPoemes();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
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
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des poèmes:', err);
        this.error = 'Impossible de charger les poèmes. Veuillez réessayer plus tard.';
        this.isLoading = false;
        this.cdr.markForCheck();
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

  openCreateForm(): void {
    console.log('openCreateForm called');
    this.editingPoeme = undefined;
    this.showForm = true;
    this.formError = '';
    console.log('showForm set to:', this.showForm);
    this.cdr.markForCheck();
  }

  openEditForm(poemeId: number): void {
    this.contentService.getContentById(poemeId).subscribe({
      next: (content) => {
        this.editingPoeme = content;
        this.showForm = true;
        this.formError = '';
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement du poème:', err);
        this.formError = 'Impossible de charger le poème pour édition';
        this.cdr.markForCheck();
      }
    });
  }

  onFormSubmit(content: ContentDto): void {
    this.formSubmitting = true;
    this.formError = '';

    const request = this.editingPoeme
      ? this.contentService.updateContent(this.editingPoeme.id, content)
      : this.contentService.createContent(content);

    request.subscribe({
      next: (response) => {
        console.log('Contenu sauvegardé:', response);
        this.formSubmitting = false;
        this.showForm = false;
        this.editingPoeme = undefined;
        this.loadPoemes(); // Recharger la liste
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde:', err);
        this.formError = err.error?.message || 'Erreur lors de la sauvegarde';
        this.formSubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }

  onFormCancel(): void {
    this.showForm = false;
    this.editingPoeme = undefined;
    this.formError = '';
    this.cdr.markForCheck();
  }

  onDelete(id: number): void {
    this.formSubmitting = true;
    this.contentService.deleteContent(id).subscribe({
      next: () => {
        console.log('Contenu supprimé avec succès');
        this.formSubmitting = false;
        this.showForm = false;
        this.editingPoeme = undefined;
        this.loadPoemes(); // Recharger la liste
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        this.formError = err.error?.message || 'Erreur lors de la suppression';
        this.formSubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }
}

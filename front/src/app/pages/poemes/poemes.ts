import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, ContentDto } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { ContentFormComponent } from '../../components/content-form/content-form';

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
export class Poemes implements OnInit {
  readonly poemes = signal<PoemeItem[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly showForm = signal(false);
  readonly editingPoeme = signal<ContentDto | undefined>(undefined);
  readonly formSubmitting = signal(false);
  readonly formError = signal('');

  readonly isAuthenticated = signal(false);
  readonly authLoading = signal(false);

  constructor(
    private readonly contentService: ContentService,
    private readonly authService: AuthService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authLoading = this.authService.isLoading;
  }

  ngOnInit() {
    this.loadPoemes();
  }

  loadPoemes() {
    this.isLoading.set(true);
    this.error.set(null);
    this.contentService.getContentTitles('poeme').subscribe({
      next: (data: ContentDto[]) => {
        this.poemes.set(data.map(item => ({
          id: item.id,
          title: item.title,
          isExpanded: false
        })));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des poèmes:', err);
        this.error.set('Impossible de charger les poèmes. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
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
          this.poemes.set([...this.poemes()]);
        },
        error: (err) => {
          console.error('Erreur lors du chargement du poème:', err);
          poeme.isLoading = false;
          poeme.isExpanded = false;
          this.poemes.set([...this.poemes()]);
        }
      });
    }
  }

  openCreateForm(): void {
    this.editingPoeme.set(undefined);
    this.showForm.set(true);
    this.formError.set('');
  }

  openEditForm(poemeId: number): void {
    this.contentService.getContentById(poemeId).subscribe({
      next: (content) => {
        this.editingPoeme.set(content);
        this.showForm.set(true);
        this.formError.set('');
      },
      error: (err) => {
        console.error('Erreur lors du chargement du poème:', err);
        this.formError.set('Impossible de charger le poème pour édition');
      }
    });
  }

  onFormSubmit(content: ContentDto): void {
    this.formSubmitting.set(true);
    this.formError.set('');

    const request = this.editingPoeme()
      ? this.contentService.updateContent(this.editingPoeme()!.id, content)
      : this.contentService.createContent(content);

    request.subscribe({
      next: (response) => {
        console.log('Contenu sauvegardé:', response);
        this.formSubmitting.set(false);
        this.showForm.set(false);
        this.editingPoeme.set(undefined);
        this.loadPoemes();
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde:', err);
        this.formError.set(err.error?.message || 'Erreur lors de la sauvegarde');
        this.formSubmitting.set(false);
      }
    });
  }

  onFormCancel(): void {
    this.showForm.set(false);
    this.editingPoeme.set(undefined);
    this.formError.set('');
  }

  onDelete(id: number): void {
    this.formSubmitting.set(true);
    this.contentService.deleteContent(id).subscribe({
      next: () => {
        console.log('Contenu supprimé avec succès');
        this.formSubmitting.set(false);
        this.showForm.set(false);
        this.editingPoeme.set(undefined);
        this.loadPoemes();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        this.formError.set(err.error?.message || 'Erreur lors de la suppression');
        this.formSubmitting.set(false);
      }
    });
  }
}

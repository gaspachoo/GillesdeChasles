import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, ContentDto } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { ContentFormComponent } from '../../components/content-form/content-form';

interface ReflexionItem {
  id: number;
  title: string;
  isExpanded: boolean;
  content?: string;
  isLoading?: boolean;
}

@Component({
  selector: 'app-reflexions',
  imports: [CommonModule, ContentFormComponent],
  templateUrl: './reflexions.html',
  styleUrl: './reflexions.css',
})
export class Reflexions implements OnInit {
  readonly reflexions = signal<ReflexionItem[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly showForm = signal(false);
  readonly editingReflexion = signal<ContentDto | undefined>(undefined);
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
    this.loadReflexions();
  }

  loadReflexions() {
    this.isLoading.set(true);
    this.error.set(null);
    this.contentService.getContentTitles('reflexion').subscribe({
      next: (data: ContentDto[]) => {
        this.reflexions.set(data.map(item => ({
          id: item.id,
          title: item.title,
          isExpanded: false
        })));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réflexions:', err);
        this.error.set('Impossible de charger les réflexions. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
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
          this.reflexions.set([...this.reflexions()]);
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la réflexion:', err);
          reflexion.isLoading = false;
          reflexion.isExpanded = false;
          this.reflexions.set([...this.reflexions()]);
        }
      });
    }
  }

  openCreateForm(): void {
    this.editingReflexion.set(undefined);
    this.showForm.set(true);
    this.formError.set('');
  }

  openEditForm(reflexionId: number): void {
    this.contentService.getContentById(reflexionId).subscribe({
      next: (content) => {
        this.editingReflexion.set(content);
        this.showForm.set(true);
        this.formError.set('');
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la réflexion:', err);
        this.formError.set('Impossible de charger la réflexion pour édition');
      }
    });
  }

  onFormSubmit(content: ContentDto): void {
    this.formSubmitting.set(true);
    this.formError.set('');

    const request = this.editingReflexion()
      ? this.contentService.updateContent(this.editingReflexion()!.id, content)
      : this.contentService.createContent(content);

    request.subscribe({
      next: (response) => {
        console.log('Contenu sauvegardé:', response);
        this.formSubmitting.set(false);
        this.showForm.set(false);
        this.editingReflexion.set(undefined);
        this.loadReflexions();
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
    this.editingReflexion.set(undefined);
    this.formError.set('');
  }

  onDelete(id: number): void {
    this.formSubmitting.set(true);
    this.contentService.deleteContent(id).subscribe({
      next: () => {
        console.log('Contenu supprimé avec succès');
        this.formSubmitting.set(false);
        this.showForm.set(false);
        this.editingReflexion.set(undefined);
        this.loadReflexions();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        this.formError.set(err.error?.message || 'Erreur lors de la suppression');
        this.formSubmitting.set(false);
      }
    });
  }
}

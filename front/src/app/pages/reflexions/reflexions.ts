import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, ContentDto } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { ContentFormComponent } from '../../components/content-form/content-form';
import { Subscription } from 'rxjs';

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
export class Reflexions implements OnInit, OnDestroy {
  reflexions: ReflexionItem[] = [];
  isLoading = true;
  error: string | null = null;
  isAuthenticated = false;
  showForm = false;
  editingReflexion: ContentDto | undefined;
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
    this.loadReflexions();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
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

  openCreateForm(): void {
    console.log('openCreateForm called');
    this.editingReflexion = undefined;
    this.showForm = true;
    this.formError = '';
    console.log('showForm set to:', this.showForm);
    this.cdr.markForCheck();
  }

  openEditForm(reflexionId: number): void {
    this.contentService.getContentById(reflexionId).subscribe({
      next: (content) => {
        this.editingReflexion = content;
        this.showForm = true;
        this.formError = '';
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la réflexion:', err);
        this.formError = 'Impossible de charger la réflexion pour édition';
        this.cdr.markForCheck();
      }
    });
  }

  onFormSubmit(content: ContentDto): void {
    this.formSubmitting = true;
    this.formError = '';

    const request = this.editingReflexion
      ? this.contentService.updateContent(this.editingReflexion.id, content)
      : this.contentService.createContent(content);

    request.subscribe({
      next: (response) => {
        console.log('Contenu sauvegardé:', response);
        this.formSubmitting = false;
        this.showForm = false;
        this.editingReflexion = undefined;
        this.loadReflexions(); // Recharger la liste
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
    this.editingReflexion = undefined;
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
        this.editingReflexion = undefined;
        this.loadReflexions(); // Recharger la liste
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

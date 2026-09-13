import { Component, OnInit, computed, input, signal, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentService, ContentDto } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';
import { ContentFormComponent } from '../content-form/content-form';

interface ContentItem {
  id: number;
  title: string;
  isExpanded: boolean;
  content?: string;
  isLoading?: boolean;
  publishedAt?: string;
}

@Component({
  selector: 'app-content-list',
  imports: [CommonModule, ContentFormComponent],
  templateUrl: './content-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './content-list.css',
})
export class ContentListComponent implements OnInit {
  // Inputs
  readonly contentType = input<'poeme' | 'reflexion'>('poeme');
  readonly contentTitle = computed(() =>
    this.contentType() === 'poeme' ? 'Poèmes' : 'Réflexions'
  );
  readonly contentLabel = computed(() =>
    this.contentType() === 'poeme' ? 'poème' : 'réflexion'
  );
  readonly contentLabelPlural = computed(() =>
    this.contentType() === 'poeme' ? 'poèmes' : 'réflexions'
  );
  readonly introText = computed(() =>
    this.contentType() === 'poeme'
      ? 'Explorez ma collection de poèmes, un voyage à travers les émotions et les paysages intérieurs.'
      : 'Explorez mes réflexions, des pensées et des considérations sur divers sujets et thèmes.'
  );

  // Signals
  readonly items = signal<ContentItem[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly showForm = signal(false);
  readonly editingItem = signal<ContentDto | undefined>(undefined);
  readonly formSubmitting = signal(false);
  readonly formError = signal('');

  readonly isAuthenticated = signal(false);
  readonly authLoading = signal(false);

  // Injections
  private readonly contentService = inject(ContentService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authLoading = this.authService.isLoading;
  }

  ngOnInit(): void {
    this.loadContent();
  }

  /**
   * Charge la liste des contenus du type spécifié
   */
  private loadContent() {
    this.isLoading.set(true);
    this.error.set(null);

    this.contentService
      .getContentTitles(this.contentType())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: ContentDto[]) => {
          this.items.set(
            data.map(item => ({
              id: item.id,
              title: item.title,
              isExpanded: false
            }))
          );
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(`Erreur lors du chargement des ${this.contentLabelPlural()}:`, err);
          this.error.set(
            `Impossible de charger les ${this.contentLabelPlural()}. Veuillez réessayer plus tard.`
          );
          this.isLoading.set(false);
        }
      });
  }

  /**
   * Charge le contenu complet d'un item par ID
   */
  private loadItemContent(
    itemId: number,
    callback: (data: ContentDto) => void,
    onError?: () => void
  ) {
    this.contentService
      .getContentById(itemId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: callback,
        error: (err) => {
          console.error('Erreur lors du chargement du contenu:', err);
          onError?.();
        }
      });
  }

  private updateItem(itemId: number, patch: Partial<ContentItem>) {
    this.items.update(items =>
      items.map(item =>
        item.id === itemId ? { ...item, ...patch } : item
      )
    );
  }

  /**
   * Bascule l'expansion/repliage d'un item et charge le contenu si nécessaire
   */
  toggleItem(item: ContentItem) {
    const isOpening = !item.isExpanded;

    this.updateItem(item.id, { isExpanded: isOpening });

    if (!isOpening) {
      return;
    }

    const currentItem = this.items().find(i => i.id === item.id);
    if (currentItem?.content) {
      return;
    }

    this.updateItem(item.id, { isLoading: true });

    this.loadItemContent(
      item.id,
      (data: ContentDto) => {
        this.updateItem(item.id, {
          content: data.contentText,
          publishedAt: data.publishedAt,
          isLoading: false,
        });
      },
      () => {
        this.updateItem(item.id, {
          isExpanded: false,
          isLoading: false,
        });
      }
    );
  }

  /**
   * Ouvre le formulaire de création
   */
  openCreateForm(): void {
    this.editingItem.set(undefined);
    this.showForm.set(true);
    this.formError.set('');
  }

  /**
   * Ouvre le formulaire d'édition et charge le contenu
   */
  openEditForm(itemId: number): void {
    this.loadItemContent(
      itemId,
      (content) => {
        this.editingItem.set(content);
        this.showForm.set(true);
        this.formError.set('');
      },
      () => {
        this.formError.set(`Impossible de charger le ${this.contentLabel()} pour édition`);
      }
    );
  }

  /**
   * Traite la soumission du formulaire (création ou mise à jour)
   */
  onFormSubmit(content: ContentDto): void {
    this.formSubmitting.set(true);
    this.formError.set('');

    const request = this.editingItem()
      ? this.contentService.updateContent(this.editingItem()!.id, content)
      : this.contentService.createContent(content);

    request
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.formSubmitting.set(false);
          this.showForm.set(false);
          this.editingItem.set(undefined);
          this.loadContent();
        },
        error: (err) => {
          console.error('Erreur lors de la sauvegarde:', err);
          this.formError.set(
            err.error?.message || 'Erreur lors de la sauvegarde'
          );
          this.formSubmitting.set(false);
        }
      });
  }

  /**
   * Annule la soumission du formulaire
   */
  onFormCancel(): void {
    this.showForm.set(false);
    this.editingItem.set(undefined);
    this.formError.set('');
  }

  /**
   * Supprime un contenu
   */
  onDelete(id: number): void {
    this.formSubmitting.set(true);

    this.contentService
      .deleteContent(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.formSubmitting.set(false);
          this.showForm.set(false);
          this.editingItem.set(undefined);
          this.loadContent();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          this.formError.set(
            err.error?.message || 'Erreur lors de la suppression'
          );
          this.formSubmitting.set(false);
        }
      });
  }
}

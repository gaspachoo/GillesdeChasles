import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentDto } from '../../services/content.service';

@Component({
  selector: 'app-content-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './content-form.html',
  styleUrl: './content-form.css',
})
export class ContentFormComponent {
  contentType = input<'poeme' | 'reflexion'>('poeme');
  existingContent = input<ContentDto | undefined>();
  isSubmitting = input(false);

  submissionDto = output<ContentDto>();
  cancelSubmission = output<void>();
  deleteSubmission = output<number>();

  title = signal('');
  contentText = signal('');
  errorMessage = signal('');
  showDeleteConfirm = signal(false);

  constructor() {
    effect(() => {
      const existing = this.existingContent();
      if (existing) {
        this.title.set(existing.title || '');
        this.contentText.set(existing.contentText || '');
      }
    });
  }

  submitForm(): void {
    if (!this.title().trim()) {
      this.errorMessage.set('Le titre est requis');
      return;
    }

    if (!this.contentText().trim()) {
      this.errorMessage.set('Le contenu est requis');
      return;
    }

    const existing = this.existingContent();
    const contentDto: ContentDto = {
      id: existing?.id || 0,
      title: this.title(),
      type: this.contentType() === 'poeme' ? 'POEME' : 'REFLEXION',
      contentText: this.contentText(),
      publishedAt: existing?.publishedAt || new Date().toISOString(),
      image: existing?.image || null,
      video: existing?.video || null,
      themes: existing?.themes || [],
      tags: existing?.tags || [],
      recommendations: existing?.recommendations || [],
      recommendedBy: existing?.recommendedBy || []
    };

    this.errorMessage.set('');
    this.submissionDto.emit(contentDto);
  }

  cancelForm(): void {
    this.cancelSubmission.emit();
  }

  resetForm(): void {
    this.title.set('');
    this.contentText.set('');
    this.errorMessage.set('');
  }

  showDeleteConfirmation(): void {
    this.showDeleteConfirm.set(true);
  }

  cancelDelete(): void {
    this.showDeleteConfirm.set(false);
  }

  confirmDelete(): void {
    const existing = this.existingContent();
    if (existing?.id) {
      this.deleteSubmission.emit(existing.id);
    }
  }
}

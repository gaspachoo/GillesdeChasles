import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentDto } from '../../services/content.service';

@Component({
  selector: 'app-content-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './content-form.html',
  styleUrl: './content-form.css',
})
export class ContentFormComponent implements OnInit {
  @Input() contentType: 'poeme' | 'reflexion' = 'poeme';
  @Input() existingContent?: ContentDto;
  @Input() isSubmitting = false;
  @Output() onSubmit = new EventEmitter<ContentDto>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<number>();

  title = '';
  contentText = '';
  errorMessage = '';
  showDeleteConfirm = false;

  ngOnInit(): void {
    if (this.existingContent) {
      this.title = this.existingContent.title || '';
      this.contentText = this.existingContent.contentText || '';
    }
  }

  submitForm(): void {
    if (!this.title.trim()) {
      this.errorMessage = 'Le titre est requis';
      return;
    }

    if (!this.contentText.trim()) {
      this.errorMessage = 'Le contenu est requis';
      return;
    }

    const contentDto: ContentDto = {
      id: this.existingContent?.id || 0,
      title: this.title,
      type: this.contentType === 'poeme' ? 'POEME' : 'REFLEXION',
      contentText: this.contentText,
      publishedAt: this.existingContent?.publishedAt || new Date().toISOString(),
      image: this.existingContent?.image || null,
      video: this.existingContent?.video || null,
      themes: this.existingContent?.themes || [],
      tags: this.existingContent?.tags || [],
      recommendations: this.existingContent?.recommendations || [],
      recommendedBy: this.existingContent?.recommendedBy || []
    };

    this.errorMessage = '';
    this.onSubmit.emit(contentDto);
  }

  cancelForm(): void {
    this.onCancel.emit();
  }

  resetForm(): void {
    this.title = '';
    this.contentText = '';
    this.errorMessage = '';
  }

  showDeleteConfirmation(): void {
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  confirmDelete(): void {
    if (this.existingContent?.id) {
      this.onDelete.emit(this.existingContent.id);
    }
  }
}

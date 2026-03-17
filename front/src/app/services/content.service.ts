import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../core/config.service';

export interface ContentDto {
  id: number;
  title: string;
  type: string;
  contentText: string;
  publishedAt: string;
  image: any;
  video: any;
  themes: any[];
  tags: any[];
  recommendations: any[];
  recommendedBy: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  getContentTitles(contentType: string): Observable<ContentDto[]> {
    return this.http.get<ContentDto[]>(`${this.config.apiUrl}/content/titles?type=${contentType}`);
  }

  getContentById(id: number): Observable<ContentDto> {
    return this.http.get<ContentDto>(`${this.config.apiUrl}/content/${id}`);
  }

  createContent(contentDto: ContentDto): Observable<ContentDto> {
    return this.http.post<ContentDto>(`${this.config.apiUrl}/content`, contentDto);
  }

  updateContent(id: number, contentDto: ContentDto): Observable<ContentDto> {
    return this.http.patch<ContentDto>(`${this.config.apiUrl}/content/${id}`, contentDto);
  }

  deleteContent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/content/${id}`);
  }
}
